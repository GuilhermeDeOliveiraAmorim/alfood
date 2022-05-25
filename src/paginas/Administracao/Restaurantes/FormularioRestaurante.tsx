import {
    AppBar,
    Button,
    Container,
    Link,
    Paper,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import http from "../Http";
import { Link as LinkDom } from 'react-router-dom';

const FormularioRestaurante = () => {
    const parametros = useParams();

    useEffect(() => {
        if (parametros.id) {
            http.get<IRestaurante>(`restaurantes/${parametros.id}/`).then(
                (resposta) => setNomeRestaurante(resposta.data.nome)
            );
        }
    }, [parametros]);

    const [nomeRestaurante, setNomeRestaurante] = useState("");

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        if (parametros.id) {
            http.put(`restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante,
            }).then(() => {
                alert(
                    "Restaurante " + nomeRestaurante + " editado com sucesso!"
                );
            });
        } else {
            http.post("restaurantes/", {
                nome: nomeRestaurante,
            }).then(() => {
                alert(
                    "Restaurante " +
                        nomeRestaurante +
                        " cadastrado com sucesso!"
                );
            });
        }
    };

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h6">Admnistração</Typography>
                        <Box sx={{ display: "flex", flexGrow: 1 }}>
                            <Link component={LinkDom} to="/admin/restaurantes">
                                <Button sx={{ my: 2, color: "white" }}>
                                    Restaurantes
                                </Button>
                            </Link>
                            <Link component={LinkDom} to="/admin/restaurantes/novo">
                                <Button sx={{ my: 2, color: "white" }}>
                                    Novo Restaurante
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box>
                <Container maxWidth="lg" sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Typography component="h1" variant="h6">
                                Inserir Novo Restaurante
                            </Typography>
                            <Box component="form" onSubmit={aoSubmeterForm}>
                                <TextField
                                    value={nomeRestaurante}
                                    onChange={(evento) =>
                                        setNomeRestaurante(evento.target.value)
                                    }
                                    id="standard-basic"
                                    label="Nome do Restaurante"
                                    variant="standard"
                                    fullWidth
                                    required
                                />
                                <br />
                                <br />
                                <Button
                                    type="submit"
                                    variant="outlined"
                                    fullWidth
                                >
                                    Salvar
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </>
    );
};

export default FormularioRestaurante;
