import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Image,
  Heading,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Input,
  VStack,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useProductStore } from "../Store/product";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { deleteProduct, updateProduct } = useProductStore();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });

  const handleUpdate = async () => {
    const result = await updateProduct(product._id, updatedProduct);
    toast({
      title: result.success ? "Success" : "Error",
      description: result.message,
      status: result.success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
    if (result.success) {
      onClose();
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const result = await deleteProduct(product._id);
      toast({
        title: result.success ? "Success" : "Error",
        description: result.message,
        status: result.success ? "success" : "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
//const {updateProduct} =useProductStore()
const handleUpdateProduct = async  (pid,updatedProduct)=>{
  await updatedProduct(pid,updatedProduct);
onClose();
}


  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton
            icon={<EditIcon />}
            onClick={onOpen}
            colorScheme="blue"
            size="sm"
            aria-label="Edit product"
          />
          <IconButton
            icon={<DeleteIcon />}
            colorScheme="red"
            size="sm"
            onClick={handleDelete}
            aria-label="Delete product"
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update a product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    name: e.target.value,
                  })
                }
              />

              <Input
                placeholder="Price"
                name="price"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
              <HStack spacing={4} w="full">
                <Button colorScheme="blue" onClick={handleUpdate} flex={1}>
                  Update Product
                </Button>
                <Button onClick={onClose} flex={1}>
                  Cancel
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
          
            <ModalFooter>
              <Button colorScheme="blue" mr={3}
              onClick={() => 
              handleUpdateProduct
              (product._id,updatedProduct)
              }>
              Update
              </Button>
              <Button variant='ghost' onClick={onClose}>
                Cancel
                </Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
