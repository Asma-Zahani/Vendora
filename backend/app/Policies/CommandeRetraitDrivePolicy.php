<?php

namespace App\Policies;

use App\Models\CommandeRetraitDrive;
use App\Models\User;

class CommandeRetraitDrivePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, CommandeRetraitDrive $commandeRetraitDrive): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, CommandeRetraitDrive $commandeRetraitDrive): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, CommandeRetraitDrive $commandeRetraitDrive): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, CommandeRetraitDrive $commandeRetraitDrive): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, CommandeRetraitDrive $commandeRetraitDrive): bool
    {
        return false;
    }
}
