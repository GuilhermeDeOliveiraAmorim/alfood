import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IPrato from "../../../interfaces/IPrato";
import http from "../Http";

const AdministracaoPratos = () => {
    const [pratos, setPratos] = useState<IPrato[]>([]);

    useEffect(() => {
        http.get("http://0.0.0.0:8000/api/v2/pratos/").then((resposta) =>
        setPratos(resposta.data)
        );
    }, []);

    const excluir = (pratoASerExcluido: IPrato) => {
        http.delete(
            `http://0.0.0.0:8000/api/v2/pratos/${pratoASerExcluido.id}/`
        ).then(() => {
            const listaPrato = pratos.filter(
                (prato) => prato.id !== pratoASerExcluido.id
            );
            setPratos(listaPrato);
        });
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Descrição</TableCell>
                        <TableCell>Tag</TableCell>
                        <TableCell>Imagem</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Excluir</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pratos.map((prato) => (
                        <TableRow key={prato.id}>
                            <TableCell>{prato.nome}</TableCell>
                            <TableCell>{prato.descricao}</TableCell>
                            <TableCell>{prato.tag}</TableCell>
                            <TableCell>
                                <a href={prato.imagem} target="_blank" rel="noreferrer">ver</a>
                            </TableCell>
                            <TableCell>
                                [
                                <Link
                                    to={`/admin/pratos/${prato.id}`}
                                >
                                    Edit
                                </Link>
                                ]
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => excluir(prato)}
                                >
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AdministracaoPratos;
