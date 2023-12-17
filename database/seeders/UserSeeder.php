<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    User::create([
      'name' => 'Admin Ganteng',
      'username' => 'admin',
      'email' => 'admin@hackerglory.id',
      'role' => 'admin',
      'password' => 'secret123'
    ]);

    User::create([
      'name' => 'Jono Doe',
      'username' => 'jono',
      'email' => 'jonodoe@hackerglory.id',
      'role' => 'penulis',
      'password' => 'secret123'
    ]);

    User::create([
      'name' => 'Joni Doe',
      'username' => 'joni',
      'email' => 'jonidoe@hackerglory.id',
      'role' => 'siswa',
      'nis' => '3719281823',
      'password' => 'secret123'
    ]);
  }
}
