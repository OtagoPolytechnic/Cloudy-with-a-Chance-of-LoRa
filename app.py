import torch
import torch.nn as nn
from torchvision import transforms
from PIL import Image
import torchvision.models as models
import torch.nn.functional as F
import gradio as gr

# Define the VisionTransformer model class
class VisionTransformer(nn.Module):
    def __init__(self, num_classes):
        super(VisionTransformer, self).__init__()
        self.model = models.vit_b_16(weights=None)  # Initialize without weights
        self.model.heads.head = nn.Linear(self.model.heads.head.in_features, num_classes)

    def forward(self, X):
        return self.model(X)

# Function to load the model
def load_model(model_path, num_classes):
    model = VisionTransformer(num_classes=num_classes)
    model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
    model.eval()  # Set the model to evaluation mode
    return model

# Preprocess the input image
def preprocess_image(image_path):
    transform = transforms.Compose([
        transforms.Resize(224),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    image = Image.open(image_path).convert("RGB")
    return transform(image).unsqueeze(0)  # Add batch dimension

# Dictionary mapping short names to full cloud names
cloud_name_mapping = {
    'AC': 'Altocumulus',
    'As': 'Altostratus',
    'Cb': 'Cumulonimbus',
    'Cc': 'Cirrocumulus',
    'Ci': 'Cirrus',
    'Cs': 'Cirrostratus',
    'Ct': 'Contrails',
    'Cu': 'Cumulus',
    'Ns': 'Nimbostratus',
    'Sc': 'Stratocumulus',
    'St': 'Stratus'
}

# Function to make a prediction
def predict(image_path, model, class_names):
    image_tensor = preprocess_image(image_path)
    with torch.no_grad():
        outputs = model(image_tensor)
        probabilities = F.softmax(outputs, dim=1)
        _, predicted = torch.max(outputs, 1)
        confidence = probabilities[0][predicted.item()].item()
        predicted_class = class_names[predicted.item()]
        full_name = cloud_name_mapping.get(predicted_class, "Unknown")
        return full_name, confidence

# Load the model
model_path = "VisionTransformer_with_crop_final_model.pth"  # Replace with your model path
class_names = ['AC','As','Cb','Cc','Ci','Cs','Ct','Cu','Ns','Sc','St']  # Replace with your actual class names
model = load_model(model_path, num_classes=len(class_names))

# Gradio interface
def classify_image(image_path):
    predicted_class, confidence = predict(image_path, model, class_names)
    return f"Prediction: {predicted_class}\nConfidence: {confidence:.2f}"

gr.Interface(
    fn=classify_image,
    inputs=gr.Image(type="filepath"),
    outputs="text",
    title="Vision Transformer Image Classification"
).launch()
