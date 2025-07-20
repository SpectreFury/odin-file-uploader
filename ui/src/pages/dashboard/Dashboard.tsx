import { Text, Container, Stack, FileUpload, Button } from "@chakra-ui/react";
import { useState } from "react";
import { ENDPOINTS } from "../../utils/api";

const Dashboard = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(ENDPOINTS.upload.file, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (!response.ok) {
      console.log("Error");
    }

    const result = await response.json();
    console.log(result);
  };

  return (
    <Container>
      <Stack mt={10} maxW="xl">
        <Text fontWeight="medium">Upload file that you want to save</Text>
        <FileUpload.Root>
          <FileUpload.HiddenInput
            onChange={(e) => setFile(e.target.files && e.target.files[0])}
          />
          <FileUpload.Trigger asChild>
            <Button variant="outline">Upload File</Button>
          </FileUpload.Trigger>
          <FileUpload.List showSize clearable />
        </FileUpload.Root>

        <Button onClick={handleUpload}>Submit</Button>
      </Stack>
    </Container>
  );
};

export default Dashboard;
