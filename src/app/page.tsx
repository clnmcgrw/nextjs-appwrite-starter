import { Section, Container, Flex, Box, Heading, Text } from '@radix-ui/themes';

export default function Home() {
  return (
    <Section>
      <Flex px="4" align="center" justify="center">
        <Box style={{textAlign:'center'}} py="5">
          <Text as="p" weight="medium" mb="2">Starter Template</Text>
          <Heading as="h1" size="8">NextJS + Appwrite</Heading>

          <Container size="1" pt="6">
            <Text color="gray">Uses NextJS /app directory, @radix-ui components (themes & primitives), and Appwrite for its backend.</Text>
          </Container>
        </Box>
      </Flex>
    </Section>
  );
};
