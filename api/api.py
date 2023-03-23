from auth_token import auth_token
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
import torch
from torch import autocast
from diffusers import StableDiffusionPipeline
import base64 
import os
import time
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware, 
    allow_credentials=True, 
    allow_origins=["*"], 
    allow_methods=["*"], 
    allow_headers=["*"]
)

device = "cuda"
model_id = "dreamlike-art/dreamlike-diffusion-1.0"
pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16, use_auth_token=auth_token)
pipe.to(device)

@app.get("/selectmodel")
def selectmodel(model:str):
    if model == "dreamlike_model":
        model_id = "dreamlike-art/dreamlike-diffusion-1.0"
    elif model == "stable_diffusion_2_model":
        model_id = "stabilityai/stable-diffusion-2"
    elif model == "stable_diffusion_v1-5":
        model_id = "runwayml/stable-diffusion-v1-5"
    elif model == "robo_diffusion_2":
        model_id = "nousr/robo-diffusion-2-base"
    elif model == "mo_di_diffusion":
        model_id = "nitrosocke/mo-di-diffusion"
    elif model == "waifu_diffusion":
        model_id = "hakurei/waifu-diffusion"
        
    else:
        model_id = "dreamlike-art/dreamlike-diffusion-1.0"
    pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16, use_auth_token=auth_token)
    device = "cuda"
    pipe.to(device)

    return ("selection successful")

@app.get("/generate")
def generate(prompt: str):
    with autocast(device): 
        image = pipe(prompt, guidance_scale=7, num_inference_steps=30, height=512, width=512).images[0]

    filename = save_image(image, prompt)
    with open(filename, "rb") as f:
        imgstr = base64.b64encode(f.read())

    return Response(content=imgstr, media_type="image/png")

# Define a function to save the image to disk
def save_image(image, prompt):
    # Create a directory for the current date, if it doesn't already exist
    today = datetime.now().strftime("%Y-%m-%d")
    save_path = "../generated-images/" + str(today)
    if not os.path.exists(save_path):
        os.makedirs(save_path)
        
    # Generate a unique filename based on timestamp and random number
    timestamp = str(int(time.time())).zfill(10)
    filename = f"{save_path}/{str(today)}-{str(timestamp)}-{str(prompt[:40])}-{str(model_id[:10])}.png"

    # Save the image to disk
    image.save(filename)

    # Return the filename for logging or further processing
    return filename