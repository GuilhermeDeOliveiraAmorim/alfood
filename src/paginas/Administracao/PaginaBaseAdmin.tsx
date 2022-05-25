import {
    AppBar,
    Button,
    Container,
    Link,
    Paper,
    Toolbar,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link as LinkDom, Outlet } from 'react-router-dom';

const PaginaBaseAdmin = () => {

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
                        <Outlet />
                    </Paper>
                </Container>
            </Box>
        </>
    );
};

export default PaginaBaseAdmin;
