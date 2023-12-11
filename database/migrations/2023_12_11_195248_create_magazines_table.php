<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('magazines', function (Blueprint $table) {
      $table->id();
      $table->string('slug')->unique();
      $table->string('title', '100');
      $table->text('description');
      $table->string('thumbnail');
      $table->boolean('with_article')->default(false);
      $table->text('article')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('magazines');
  }
};
