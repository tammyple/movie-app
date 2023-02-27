import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import Container from "@mui/material/Container";

export default function LoginModal({ login }) {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            marginRight: 0,
            marginLeft: 0,
            padding: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: `linear-gradient(rgb(50, 50, 50) 0%, rgb(63, 63, 63) 40%, rgb(28, 28, 28) 150%), linear-gradient(to top, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0.25) 200%)`,
          }}
        >
          <LoginForm callback={() => {}} />
        </Box>
      </Container>
    </Modal>
  );
}
