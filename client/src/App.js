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
      <Container maxW="xl" mt="50px" mb="100px">
        <Heading as="h1" mb="5">
          Dream-like Stable Diffusion
        </Heading>
        <Text fontSize="xl" mb="10">
          The dreamlike-diffusion-v1 model can be found via{" "}
          <Link
            href={
              "https://huggingface.co/dreamlike-art/dreamlike-diffusion-1.0"
            }
            isExternal
            textDecoration="underline"
          >
            https://huggingface.co/dreamlike-art/dreamlike-diffusion-1.0
          </Link>
        </Text>

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
