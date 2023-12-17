<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Magazine>
 */
class MagazineFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'category_id' => $this->faker->numberBetween(1, 3),
      'author_id' => $this->faker->numberBetween(1, 2),
      'title' => $this->faker->sentence,
      'description' => $this->faker->paragraph,
      'thumbnail' => 'uploads/sample.jpg',
    ];
  }
}
