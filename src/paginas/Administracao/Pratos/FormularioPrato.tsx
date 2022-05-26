import {
    AppBar,
    Button,
    Container,
    FormControl,
    InputLabel,
    Link,
    MenuItem,
    Paper,
    Select,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IPrato from "../../../interfaces/IPrato";
import http from "../Http";
import { Link as LinkDom } from "react-router-dom";
import ITag from "../../../interfaces/ITag";

const FormularioPrato = () => {

    const [nomePrato, setNomePrato] = useState('');
    const [descricaoPrato, setDescricaoPrato] = useState('');
    const [tags, setTags] = useState<ITag[]>([]);
    const [tag, setTag] = useState('');

    useEffect(() => {
        http.get<{tags: ITag[]}>('tags/')
            .then(resposta => setTags(resposta.data.tags))
    }, [])

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h6">
                    Inserir Novo Prato
                </Typography>
                <Box component="form" onSubmit={aoSubmeterForm}>
                    <TextField
                        value={nomePrato}
                        onChange={(evento) =>
                            setNomePrato(evento.target.value)
                        }
                        id="standard-basic"
                        label="Nome do Prato"
                        variant="standard"
                        fullWidth
                        required
                        margin="dense"
                    />
                    <TextField
                        value={descricaoPrato}
                        onChange={(evento) =>
                            setDescricaoPrato(evento.target.value)
                        }
                        id="standard-basic"
                        label="Descrição do Prato"
                        variant="standard"
                        fullWidth
                        required
                        margin="dense"
                    />
                    <FormControl margin="dense" fullWidth>
                        <InputLabel id="select-tag">Tag</InputLabel>
                        <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}>
                            {tags.map(tag => <MenuItem key={tag.id} value={tag.id}>
                                {tag.value}
                            </MenuItem>)}
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="outlined" fullWidth>
                        Salvar
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default FormularioPrato;
