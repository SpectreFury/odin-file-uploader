import { Text, Container, Stack, FileUpload, Button } from "@chakra-ui/react";
import { useState } from "react";
import { ENDPOINTS } from "../../utils/api";
import { toast } from "sonner";

const Dashboard = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    setLoading(true);

    try {
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(ENDPOINTS.upload.file, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error: Response is not ok");
      }

      toast.success("File has been successfully uploaded")
    } catch (error: any) {
      toast.error(error.message)
    }
    setLoading(false);
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

        <Button onClick={handleUpload} disabled={loading}>Submit</Button>
      </Stack>
    </Container>
  );
};

export default Dashboard;
