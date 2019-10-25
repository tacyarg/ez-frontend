import React from "react";
import { Flex, Badge, Box, Page, Avatar, Image, Text } from "../primitives";

export default ({
  price = 25.99, 
  name = 'Afterglow Wired Controller for Xbox One', 
  // image = 'https://files.opskins.media/file/vgo-img/item/wax-key-300.png'
  image = 'https://files.opskins.media/file/vgo-img/item/awp-golden-illusion-factory-new-300.png'
}) => {
  return (
    <Image
      m={1}
      p={2}
      as={Flex}
      flexDirection="column"
      bg="backingLight"
      width={160}
      height={130}
      src={image}
      border="2px solid #777777"
      boxShadow="0 4px 0 0 #777777;"
    >
      <Flex>
        <Text color="yellow">
          $
          {Number(price).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </Text>
        <Box mx="auto" />
        <Avatar
          src={
            "https://www.gravatar.com/avatar/2cfb1ef04b6ec071fc74171d3687a5ee?d=identicon&r=pg&s=32"
          }
          size={32}
        />
      </Flex>
      <Box my="auto" />
      <Text fontSize={1}>{name}</Text>
    </Image>
  );
};
