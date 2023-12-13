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
      $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
      $table->foreignId('author_id')->references('id')->on('users')->onDelete('cascade');
      $table->string('slug')->unique();
      $table->string('title', '100');
      $table->text('description');
      $table->string('thumbnail');
      $table->text('article')->nullable();
      $table->boolean('approved')->default(false);
      $table->timestamp('published_at');
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
