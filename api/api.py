from auth_token import auth_token
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
import torch
from torch import autocast
from diffusers import StableDiffusionPipeline
from io import BytesIO
import base64 
import random

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

@app.get("/")
def generate(prompt: str, model:str):
    with autocast(device): 
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
        else:
            model_id = "dreamlike-art/dreamlike-diffusion-1.0"
        pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16, use_auth_token=auth_token)
        pipe.to(device)
        image = pipe(prompt, guidance_scale=7, num_inference_steps=30, height=512, width=512).images[0]

    randN = (random.randint(0,9999))
    image.save("../saved-images/dl-" + str(randN)+ "-" + prompt[:50] + ".png")
    buffer = BytesIO()
    image.save(buffer, format="PNG")
    imgstr = base64.b64encode(buffer.getvalue())

    return Response(content=imgstr, media_type="image/png")