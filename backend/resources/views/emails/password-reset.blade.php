<!DOCTYPE html>
<html>
<head>
    <title>Réinitialisation du mot de passe</title>
</head>
<body style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
    <div style="max-width: 600px; margin: auto; border: 1px solid #dadce0; padding: 20px; border-radius: 8px;">        
        <!-- Logo -->
        <div style="text-align: center;">
            <img src="{{ $pathToImage }}" alt="Logo" style="height: 50px;">
        </div>

        <h2 style="color: #333;">Bonjour {{ $user->prenom }} {{ $user->nom }},</h2>
        <p style="color: #555;">Nous avons reçu une demande pour réinitialiser votre mot de passe. Si vous n'avez pas effectué cette demande, veuillez ignorer cet e-mail.</p>

        <p style="color: #555;">Pour réinitialiser votre mot de passe, cliquez sur le bouton ci-dessous :</p>

        <a href="{{ $url }}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; color: white; background-color: #665292FF; text-decoration: none; border-radius: 5px;">
            Réinitialiser mon mot de passe
        </a>

        <p style="color: #555;">Si vous avez des questions ou rencontrez des problèmes, n'hésitez pas à nous contacter.</p>

        <p style="color: #555;">Cordialement, <br> L'équipe de Vendora</p>

        <!-- Footer -->
        <p style="margin-top: 20px; color: #999; font-size: 12px;">
            © {{ date('Y') }} Vendora™. Tous droits réservés.
        </p>
    </div>
</body>
</html>