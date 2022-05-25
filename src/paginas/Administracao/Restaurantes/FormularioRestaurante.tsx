import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioRestaurante = () => {
    const parametros = useParams();

    useEffect(() => {
        if (parametros.id) {
            axios
                .get<IRestaurante>(
                    `http://0.0.0.0:8000/api/v2/restaurantes/${parametros.id}/`
                )
                .then((resposta) => setNomeRestaurante(resposta.data.nome));
        }
    }, [parametros]);

    const [nomeRestaurante, setNomeRestaurante] = useState("");

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        if (parametros.id) {
            axios
                .put(
                    `http://0.0.0.0:8000/api/v2/restaurantes/${parametros.id}/`,
                    {
                        nome: nomeRestaurante,
                    }
                )
                .then(() => {
                    alert(
                        "Restaurante " +
                            nomeRestaurante +
                            " editado com sucesso!"
                    );
                });
        } else {
            axios
                .post("http://0.0.0.0:8000/api/v2/restaurantes/", {
                    nome: nomeRestaurante,
                })
                .then(() => {
                    alert(
                        "Restaurante " +
                            nomeRestaurante +
                            " cadastrado com sucesso!"
                    );
                });
        }
    };

    return (
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
                <Button type="submit" variant="outlined" fullWidth>
                    Salvar
                </Button>
            </Box>
        </Box>
    );
};

export default FormularioRestaurante;
