<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UserSeeder::class);
        \App\User::create([
            'name' => 'testing',
            'email' => 'testing@test.com',
            'email_verified_at' => now(),
            'password' => bcrypt('test123'),
            'remember_token' => Str::random(10),
        ]);

        factory(\App\LeadTask::class, 50)->create();
    }
}
