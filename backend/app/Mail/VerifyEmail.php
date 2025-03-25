<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;

class VerifyEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;  
    public $verificationUrl;

    /**
     * Create a new message instance.
     */
    public function __construct($user, $token)
    {
        $this->user = $user; 
        $this->verificationUrl = url('/api/auth/verify-email?token=' . $token);
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Vérifiez votre adresse email',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        // $pathToImage = public_path('logo.png');
        $pathToImage = config('services.cloudinary_logo');

        return new Content(
            view: 'emails.verify-email',
            with: [
                'verificationUrl' => $this->verificationUrl,
                'pathToImage' => $pathToImage
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}