import {
  ChakraProvider,
  Heading,
  Container,
  Text,
  Flex,
  Textarea,
  Button,
  Wrap,
  Stack,
  Image,
  Link,
  SkeletonCircle,
  SkeletonText,
  Select,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const App = () => {
  const [image, updateImage] = useState();
  const [prompt, updatePrompt] = useState();
  const [loading, updateLoading] = useState();
  const [model, setModel] = useState("dreamlike_model");

  const generate = async (prompt) => {
    updateLoading(true);
    const result = await axios.get(
      `http://127.0.0.1:8000/generate?prompt=${prompt}`
    );
    updateImage(result.data);
    updateLoading(false);
  };

  const selectmodel = async (prompt) => {
    updateLoading(true);
    const result = await axios.get(
      `http://127.0.0.1:8000/selectmodel?model=${model}`
    );
    //updateImage(result.data);
    updateLoading(false);
  };

  const handleModelChange = (e) => {
    setModel(e.target.value);
  };

  return (
    <ChakraProvider>
      <Heading
        as="h1"
        mb="5"
        fontSize={"42"}
        textAlign="center"
        color={"red"}
        margin={"20px 0"}
      >
        Stable Diffusion Web App
      </Heading>
      <Heading
        as="h1"
        mb="5"
        fontSize={"20"}
        textAlign="center"
        color={"grey"}
        marginTop={"-25px"}
      >
        by{" "}
        <Link
          href={"https://github.com/dsplayerX"}
          isExternal
          textDecoration="none"
        >
          dsplayerX
        </Link>
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, md: 2 }} gap={5}>
        <Box
          width={"600px"}
          height={"600px"}
          margin="20px auto"
          // backgroundColor={"red"}
          padding={"20px"}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Stack direction="row" mb="4">
            <Wrap spacing="4" mb="10">
              <Select
                value={model}
                onChange={handleModelChange}
                width={"350px"}
              >
                <option value="dreamlike_model">Dream-like v1.0</option>
                <option value="stable_diffusion_2_model">
                  Stable Diffusion v2
                </option>
                <option value="stable_diffusion_v1-5">
                  Stable Diffusion v1.5
                </option>
                <option value="robo_diffusion_2">Robo Diffusion 2</option>
                <option value="mo_di_diffusion">Mo Di Diffusion</option>
                <option value="waifu_diffusion">Waifu Diffusion</option>
              </Select>
              <Button onClick={(e) => selectmodel(model)} colorScheme={"red"}>
                Apply
              </Button>
            </Wrap>
          </Stack>
          <Stack direction="row">
            <Flex direction="column" spacing="4" mb="3">
              <Wrap spacing="4" mb="4">
                <Textarea
                  value={prompt}
                  onChange={(e) => updatePrompt(e.target.value)}
                  width={"450px"}
                  maxWidth={"450px"}
                  height={"200px"}
                  resize="none"
                  variant="filled"
                  placeholder="Enter your prompt here..."
                />
              </Wrap>
              <Button onClick={(e) => generate(prompt)} colorScheme={"red"}>
                Dream
              </Button>
            </Flex>
          </Stack>
        </Box>
        <Box
          margin="20px"
          width={"600px"}
          height={"600px"}
          backgroundColor={"#dcdcdc"}
          borderRadius={"10px"}
        >
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
              h="100%"
              objectFit="cover"
            />
          ) : null}
        </Box>
      </SimpleGrid>
      <Box padding={"20px"}>
        <Stack>
          <Flex direction="column" spacing="4" mb="3">
            <Heading>Links to all the models</Heading>
            <Text fontSize="xl" mb="10">
              <Link
                href={
                  "https://huggingface.co/dreamlike-art/dreamlike-diffusion-1.0"
                }
                isExternal
                textDecoration="underline"
              >
                Dreamlike Diffusion v1 Model
              </Link>
              <br />
              <Link
                href={"https://huggingface.co/stabilityai/stable-diffusion-2"}
                isExternal
                textDecoration="underline"
              >
                Stable Diffusion v2 Model
              </Link>
              <br />
              <Link
                href={"https://huggingface.co/runwayml/stable-diffusion-v1-5"}
                isExternal
                textDecoration="underline"
              >
                Stable Diffusion v1.5 Model
              </Link>
              <br />
              <Link
                href={"https://huggingface.co/nousr/robo-diffusion"}
                isExternal
                textDecoration="underline"
              >
                Robo Diffusion
              </Link>
              <br />
              <Link
                href={"https://huggingface.co/nitrosocke/mo-di-diffusion"}
                isExternal
                textDecoration="underline"
              >
                Mo Di Diffusion Model
              </Link>
              <br />
              <Link
                href={"https://huggingface.co/hakurei/waifu-diffusion"}
                isExternal
                textDecoration="underline"
              >
                Waifu Diffusion Model
              </Link>
              <br />
            </Text>
          </Flex>
        </Stack>
      </Box>
    </ChakraProvider>
  );
};

export default App;
