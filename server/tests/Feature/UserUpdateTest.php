<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class UserUpdateTest extends TestCase
{


    use DatabaseTransactions;

    public function test_admin_cannot_change_their_own_role_via_api()
    {
        // 1. Felhasználó létrehozása (a 'hashed' cast miatt nem kell Hash::make)
        $name = 'Admin 2';
        $email = 'admin2@example.com';
        $password = '123';
        $admin = User::create([
            'name'     => $name,
            'email'    => $email,
            'password' => $password,
            'role'     => 1,
        ]);

        // 2. Bejelentkezés a te meglévő logikád szerint
        $loginResponse = $this->postJson('/api/users/login', [
            'email'    => $email,
            'password' => $password,
        ]);

        $token = $loginResponse->json('data.token');;

        // 3. Módosítási kísérlet Bearer tokennel
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->patchJson("/api/users/{$admin->id}", [
            'name'  => 'Módosított Név',
            'email' => $admin->email,
            'role'  => 2, // Itt bukik el a validáció
        ]);

        // 4. Ellenőrzések
        $response->assertStatus(422); // Validációs hiba kódja
        $response->assertJsonValidationErrors([
            'role' => 'Saját magad szerepkörét biztonsági okokból nem módosíthatod.'
        ]);

        // Biztosítjuk, hogy az adatbázisban nem történt meg a role csere
        $this->assertEquals(1, $admin->fresh()->role);
    }
}
