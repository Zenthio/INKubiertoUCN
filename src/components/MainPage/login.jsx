// src/components/MainPage/login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:3001/auth/login', {
                email,
                password,
            });

            // Obtener el token de la respuesta
            const { token, message } = response.data;

            if (message === 'Inicio de sesión exitoso') {
                // Guardar el token en localStorage para mantener la sesión
                localStorage.setItem('token', token);
                localStorage.setItem('email', email);
                navigate('/finance'); // Redirigir al home después del login exitoso
            } else {
                setError('Credenciales inválidas');
            }
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
            setError(error.response?.data?.message || 'Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h2>Iniciar Sesión</h2>
                    <p>Ingresa tu correo electrónico y contraseña para acceder a tu cuenta.</p>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                        <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Cargando...' : 'Iniciar Sesión'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
