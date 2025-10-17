//create page.jsx

import {
  useColorModeValue,
  Container,
  VStack,
  Heading,
  Box,
  Input,
  Button,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import React from "react";
import { useProductStore } from "../Store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = React.useState({
    name: "",
    price: "",
    image: "",
  });
  const toast = useToast();
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    console.log("success", success);
    console.log("message", message);
    if (success) {
      toast({
        title: "Product created",
        description: message,
        status: "success",
        isClosable: true,
      });
    } else {
      toast({
        title: "Product creation failed",
        description: message,
        status: "error",
        isClosable: true,
      });
    }
    setNewProduct({
      name: "",
      price: "",
      image: "",
    });
  }; //handle add product

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center" mb={8}>
          Create New Product
        </Heading>

        <Box
          w="full"
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          shadow="md"
          rounded="lg"
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  name: e.target.value,
                })
              }
            />

            <Input
              placeholder="Price"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: e.target.value,
                })
              }
            />

            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  image: e.target.value,
                })
              }
            />

            <Button colorScheme="blue" onClick={handleAddProduct} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
