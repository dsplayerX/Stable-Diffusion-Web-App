import {
  ChakraProvider,
  Heading,
  Container,
  Text,
  Input,
  Button,
  Wrap,
  Stack,
  Image,
  Link,
  SkeletonCircle,
  SkeletonText,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const App = () => {
  const [image, updateImage] = useState();
  const [prompt, updatePrompt] = useState();
  const [loading, updateLoading] = useState();

  const generate = async (prompt) => {
    updateLoading(true);
    const result = await axios.get(
      `http://127.0.0.1:8000/?prompt=${prompt}&model=${model}`
    );
    updateImage(result.data);
    updateLoading(false);
  };

  const [model, setModel] = useState("model1");

  const handleModelChange = (e) => {
    setModel(e.target.value);
  };

  return (
    <ChakraProvider>
      <Container maxW="xl" mt="50px" mb="100px">
        <Heading as="h1" mb="5">
          Dream-like Stable Diffusion
        </Heading>
        <Text fontSize="xl" mb="10">
          <Link
            href={
              "https://huggingface.co/dreamlike-art/dreamlike-diffusion-1.0"
            }
            isExternal
            textDecoration="underline"
          >
            dreamlike-diffusion-v1 model
          </Link>
        </Text>
        <Text fontSize="xl" mb="10">
          <Link
            href={"https://huggingface.co/stabilityai/stable-diffusion-2"}
            isExternal
            textDecoration="underline"
          >
            stable diffusion v2 model
          </Link>
        </Text>

        <Stack direction="row" mb="4">
          <Select value={model} onChange={handleModelChange} width={"200px"}>
            <option value="dreamlike_model">Dream-like Model v1.0</option>
            <option value="stable_diffusion_2_model">
              Stable Diffusion v2 Model
            </option>
            <option value="stable_diffusion_v1-5">Stable Diffusion v1.5</option>
            <option value="robo_diffusion_2">Robo Diffusion 2</option>
            <option value="mo_di_diffusion">Mo Di Diffusion</option>
          </Select>
        </Stack>

        <Wrap spacing="4" mb="10">
          <Input
            value={prompt}
            onChange={(e) => updatePrompt(e.target.value)}
            width={"350px"}
            variant="filled"
            placeholder="Enter your prompt here..."
          />
          <Button onClick={(e) => generate(prompt)} colorScheme={"red"}>
            Dream
          </Button>
        </Wrap>

        {loading ? (
          <Stack>
            <SkeletonCircle size="20" />
            <SkeletonText mt="4" noOfLines={5} spacing="4" />
          </Stack>
        ) : image ? (
          <Image
            src={`data:image/png;base64,${image}`}
            boxShadow="lg"
            borderRadius="md"
            w="100%"
          />
        ) : null}
      </Container>
    </ChakraProvider>
  );
};

export default App;
