// src/components/MainPage/RegisterPage.jsx
import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css'; 

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        nameLastName: '',  
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Enviar datos al backend con axios
            const response = await axios.post('http://localhost:3000', {
                query: `
                    mutation {
                        registerUsuario(
                            nameLastName: "${formData.nameLastName}", 
                            username: "${formData.username}", 
                            email: "${formData.email}", 
                            password: "${formData.password}"
                        ) {
                            userID
                            username
                            email
                        }
                    }
                `
            });

            const { data } = response;
            if (data.errors) {
                setError(data.errors[0].message);
                setLoading(false);
                return;
            }

            console.log('Registro exitoso:', data.data.registerUsuario);
            navigate('/login'); 

        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
            setError('Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h2>Crear una Cuenta</h2>
                    <p>Por favor, llena los campos para crear una cuenta nueva.</p>

                    <div className="form-group">
                        <label htmlFor="nameLastName">Nombre Completo</label>
                        <input
                            type="text"
                            id="nameLastName"
                            name="nameLastName"
                            value={formData.nameLastName}
                            onChange={handleChange}
                            placeholder="Nombre Completo"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Nombre de Usuario</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Nombre de Usuario"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            placeholder="Correo Electrónico"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Contraseña"
                            required
                        />
                    </div>

                    {error && <p className="error">{error}</p>}

                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>

                    <div className="auth-link">
                        ¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
