const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

/* --------------------------------------------------
   TESTE DO SERVIDOR
-------------------------------------------------- */

app.get("/", (req, res) => {
    res.send("Servidor da MotorSolutions funcionando!");
});

/* --------------------------------------------------
   CONFIGURAÇÃO DO EMAIL
-------------------------------------------------- */

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_SENHA
    }
});

/* --------------------------------------------------
   FORMULÁRIO DE CONTATO
-------------------------------------------------- */

app.post("/api/contato", async (req, res) => {

    const {
        nome,
        email,
        empresa,
        interesse,
        mensagem
    } = req.body;

    /* Verifica os campos obrigatórios */

    if (!nome || !email || !interesse || !mensagem) {

        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha todos os campos obrigatórios."
        });

    }

    try {

        /* Envia o email */

        await transporter.sendMail({

            from: process.env.EMAIL,

            to: process.env.EMAIL,

            replyTo: email,

            subject: `Novo contato - ${nome}`,

            html: `
                <div style="font-family: Arial, sans-serif;">

                    <h2>Novo contato pelo site</h2>

                    <hr>

                    <p>
                        <strong>Nome:</strong>
                        ${nome}
                    </p>

                    <p>
                        <strong>Email:</strong>
                        ${email}
                    </p>

                    <p>
                        <strong>Empresa:</strong>
                        ${empresa || "Não informado"}
                    </p>

                    <p>
                        <strong>Interesse:</strong>
                        ${interesse}
                    </p>

                    <p>
                        <strong>Mensagem:</strong>
                    </p>

                    <p>
                        ${mensagem}
                    </p>

                </div>
            `
        });

        res.json({

            sucesso: true,

            mensagem: "Mensagem enviada com sucesso!"

        });

    } catch (error) {

        console.error("Erro ao enviar email:", error);

        res.status(500).json({

            sucesso: false,

            mensagem: "Erro ao enviar mensagem."

        });

    }

});

/* --------------------------------------------------
   INICIAR SERVIDOR
-------------------------------------------------- */

app.listen(3000, () => {

    console.log(
        "Servidor rodando em http://localhost:3000"
    );

});