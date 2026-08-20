const nodemailer = require("nodemailer");

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_SENHA
    }
});

export default async function handler(req, res) {
    // Permite apenas requisições POST
    if (req.method !== "POST") {
        return res.status(405).json({
            sucesso: false,
            mensagem: "Método não permitido"
        });
    }

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
                    <p><strong>Nome:</strong> ${nome}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Empresa:</strong> ${empresa || "Não informado"}</p>
                    <p><strong>Interesse:</strong> ${interesse}</p>
                    <p><strong>Mensagem:</strong></p>
                    <p>${mensagem}</p>
                </div>
            `
        });

        return res.status(200).json({
            sucesso: true,
            mensagem: "Mensagem enviada com sucesso!"
        });

    } catch (error) {
        console.error("Erro ao enviar email:", error);
        return res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao enviar mensagem."
        });
    }
}