<?php

namespace Database\Seeders;

use App\Models\Magazine;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MagazineSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    Magazine::factory()->create([
      'title' => 'Ini Contoh Tanpa Artikel',
      'approved' => true,
      'published_at' => now()
    ]);

    Magazine::factory()->create([
      'title' => 'Ini Contoh Dengan Artikel',
      'approved' => true,
      'article' => '<p>Ini adalah contoh dalam membuat artikel dalam mading, semua hal disini bersifat rich text, jadi mulai dari embed gambar link list dan format format lainnya juga didukung</p><p><br></p><p>Akses smk koding website <a href="https://smkcoding.id/" rel="noopener noreferrer" target="_blank">disini</a></p><p><br></p><p>todo ku hari ini</p><ol><li>Makan</li><li>Minum</li><li>Mandi</li><li>Bermain Bersama</li></ol><p><br></p><blockquote>Aku pengen jadi juara di SMK CODING hehehehe</blockquote><p><br></p><p>Untuk fitur lainnya dapat dicoba pada bagian dashboard yang dapat diakses oleh admin dan juga penulis</p>',
      'published_at' => now(),
    ]);

    Magazine::factory(15)->create([
      'approved' => true,
      'published_at' => now()
    ]);

    Magazine::factory(2)->create([
      'approved' => false,
      'published_at' => now()
    ]);

    Magazine::factory(2)->create([
      'approved' => false,
      'published_at' => now()->addDays(fake()->numberBetween(1, 5))
    ]);

    Magazine::factory(3)->create([
      'approved' => true,
      'important' => true,
      'published_at' => now()
    ]);
  }
}
