//Homepage.jsx
import { Container, VStack, Text, SimpleGrid, Box, Image, Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../Store/product";
import ProductCard from "../components/ProductCard";

const Homepage = () => {

  const {fetchProducts,products} = useProductStore();

useEffect(() =>{
  fetchProducts();
},[fetchProducts]);
console.log("products:",products);

  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
        <Text
          fontSize="30px"
          fontWeight="bold"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
          textAlign="center"
        >
          Current Products 🚀
        </Text>
        {products.length > 0 ? (
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            spacing={10}
            w={"full"}
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product}/>
            ))}
          </SimpleGrid>
        ) : (
          <Text fontSize='xl' textAlign="center" 
          fontWeight='bold' color='gray.500'>
            No products found {""}
            <Link to={"/create"}>
              <Text as='span' color='blue.400' _hover={{
                textDecoration: "underline"
              }}>
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default Homepage;

         
