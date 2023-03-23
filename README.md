# Stable-Diffusion-React-App

A Simple React WebApp and a FastAPI backend that uses Stable Diffusion Pipelines to generate images.

![Imgur](https://i.imgur.com/9vNuMFB.png)

## Features

- Simple and intuitive UI
- Enter any prompt (maximum 77 tokens)
- Select model from various diffusion models
- All generated images are saved locally

#### To-Be-Implemented

- Save button to download generated image
- Generate images with more inference steps
- Enter custom heights and/or widths for images

## How To Use

### Add Token:

create 'auth_token.py' in /api and add variable "auth_token" with your huggingface token.

### Run API : `uvicorn api:app --reload`

### Run Client : `npm start`

## API Routes

#### Generate

```http
  GET /generate
```

| Parameter | Type     | Description                               |
| :-------- | :------- | :---------------------------------------- |
| `prompt`  | `string` | **Required**. The text prompt of an image |

#### Select Model

```http
  GET /selectmodel
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `model`   | `string` | **Required**. The model to be used |

## References

- Stable Diffusion: https://huggingface.co/blog/stable_diffusion
- Diffusers: https://github.com/huggingface/diffusers/blob/main/README.md

### Models

- Dream-like v1 Model: https://huggingface.co/dreamlike-art/dreamlike-diffusion-1.0
- Stable Diffusion v2 Model: https://huggingface.co/stabilityai/stable-diffusion-2
- Stable Diffusion v1.5 Model: https://huggingface.co/runwayml/stable-diffusion-v1-5
- Robo Diffusion: https://huggingface.co/nousr/robo-diffusion
- Mo Di Diffusion Model: https://huggingface.co/nitrosocke/mo-di-diffusion
- Waifu Diffusion Model: https://huggingface.co/hakurei/waifu-diffusion
