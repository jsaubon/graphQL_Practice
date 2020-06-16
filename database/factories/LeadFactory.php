<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Lead;
use Faker\Generator as Faker;

$factory->define(Lead::class, function (Faker $faker) {
    return [
        'user_id' => factory(\App\User::class)->create()->id,
        'lead_name' => $faker->name,
        'email_address' => $faker->unique()->email,
        'phone_number' => $faker->phoneNumber
    ];
});
