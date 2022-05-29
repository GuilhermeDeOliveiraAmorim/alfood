import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import http from "../Http";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioPrato = () => {

    const [nomePrato, setNomePrato] = useState('');
    const [descricao, setDescricaoPrato] = useState('');

    const [tags, setTags] = useState<ITag[]>([]);
    const [tag, setTag] = useState('');

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
    const [restaurante, setRestaurante] = useState('');

    const [imagem, setImagem] = useState<File | null>(null);

    useEffect(() => {
        http.get<{tags: ITag[]}>('tags/')
            .then(resposta => setTags(resposta.data.tags))
        http.get<IRestaurante[]>('restaurantes/')
            .then(resposta => setRestaurantes(resposta.data))
    }, [])

    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if (evento.target.files?.length) {
            setImagem(evento.target.files[0]);
        } else {
            setImagem(null);
        }
    }
    
    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {

        evento.preventDefault();

        const formData = new FormData();

        formData.append('nome', nomePrato);

        formData.append('descricao', descricao);

        formData.append('tag', tag);

        formData.append('restaurante', restaurante);

        if (imagem) {
            formData.append('imagem', imagem);
        }

        http.request({
            url: 'pratos/',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
        .then(() => {
            setNomePrato('')
            setDescricaoPrato('')
            setTag('')
            setRestaurante('')
            alert('Prato feito!')
        })
        .catch(erro => console.log(erro))
    }

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
                        value={descricao}
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
                            {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>
                                {tag.value}
                            </MenuItem>)}
                        </Select>
                    </FormControl>

                    <FormControl margin="dense" fullWidth>
                        <InputLabel id="select-restaurante">Restaurante</InputLabel>
                        <Select labelId="select-restaurante" value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
                            {restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>
                                {restaurante.nome}
                            </MenuItem>)}
                        </Select>
                    </FormControl>

                    <input type="file" onChange={selecionarArquivo} />

                    <Button type="submit" variant="outlined" fullWidth>
                        Adicionar
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default FormularioPrato;