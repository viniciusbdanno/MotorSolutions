const nodemailer = require("nodemailer");

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
   ESCAPE DE HTML (evita injeção no corpo do e-mail)
-------------------------------------------------- */

function escapeHtml(texto) {
    if (!texto) return "";
    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/* --------------------------------------------------
   FUNÇÃO SERVERLESS DA VERCEL
   Substitui a rota Express app.post("/api/contato", ...)
-------------------------------------------------- */

module.exports = async (req, res) => {

    /* A Vercel já expõe essa função em /api/contato automaticamente
       pelo nome do arquivo, sem precisar de Express nem CORS
       (mesmo domínio do frontend, então CORS nem é necessário aqui) */

    if (req.method !== "POST") {
        return res.status(405).json({
            sucesso: false,
            mensagem: "Método não permitido."
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
            subject: `Novo contato - ${escapeHtml(nome)}`,
            html: `
                <div style="font-family: Arial, sans-serif;">
                    <h2>Novo contato pelo site</h2>
                    <hr>
                    <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
                    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                    <p><strong>Empresa:</strong> ${escapeHtml(empresa) || "Não informado"}</p>
                    <p><strong>Interesse:</strong> ${escapeHtml(interesse)}</p>
                    <p><strong>Mensagem:</strong></p>
                    <p>${escapeHtml(mensagem)}</p>
                </div>
            `
        });

        return res.json({
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

};