<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\URL;

class PasswordResetEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $token;
    /**
     * Create a new message instance.
     */
    public function __construct($token, $user)
    {
        $this->token = $token;
        $this->user = $user;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Password Reset Email',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        // $pathToImage = public_path('logo.svg');
        $pathToImage = config('services.cloudinary_logo');
        $url = URL::to('http://localhost:5173/reset-password?'. http_build_query(['token' => $this->token]));
        return new Content(
            view: 'emails.password-reset',
            with: [
                'url' => $url,
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