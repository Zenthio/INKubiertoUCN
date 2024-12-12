import React, { useState } from 'react';
import axios from 'axios';
import './RequestResetPass.css';

const RequestResetPass = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/auth/request-reset-password', { email });
      setMessage('El token de confirmación ha sido enviado con éxito.');
    } catch (error) {
      console.error('Error al enviar el token de confirmación:', error);
      setMessage('Error al enviar el token de confirmación.');
    }
  };

  return (
    <div className="request-reset-pass">
      <h1 className="title">Cambio de contraseña</h1>
      <p>Recibirá un token de confirmación en su correo, este tendrá una validez de 24 horas.</p>
      <form onSubmit={handleSubmit}>
        <label className="label" htmlFor="email">Por favor ingrese correo para continuar:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Confirmar envío</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default RequestResetPass;