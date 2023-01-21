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
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const App = () => {
  const [image, updateImage] = useState();
  const [prompt, updatePrompt] = useState();
  const [loading, updateLoading] = useState();

  const generate = async (prompt) => {
    updateLoading(true);
    const result = await axios.get(`http://127.0.0.1:8000/?prompt=${prompt}`);
    updateImage(result.data);
    updateLoading(false);
  };

  return (
    <ChakraProvider>
      <Container>
        <Heading marginTop={"20px"}>Dream-like Stable Diffusion</Heading>
        <Text marginBottom={"20px"} marginTop={"20px"}>
          The dreamlike-diffusion-v1 model can be found via{" "}
          <Link
            href={
              "https://huggingface.co/dreamlike-art/dreamlike-diffusion-1.0"
            }
          >
            https://huggingface.co/dreamlike-art/dreamlike-diffusion-1.0
          </Link>
        </Text>

        <Wrap marginBottom={"20px"}>
          <Input
            value={prompt}
            onChange={(e) => updatePrompt(e.target.value)}
            width={"350px"}
          ></Input>
          <Button onClick={(e) => generate(prompt)} colorScheme={"red"}>
            Dream
          </Button>
        </Wrap>

        {loading ? (
          <Stack>
            <SkeletonCircle />
            <SkeletonText />
          </Stack>
        ) : image ? (
          <Image src={`data:image/png;base64,${image}`} boxShadow="lg" />
        ) : null}
      </Container>
    </ChakraProvider>
  );
};

export default App;
