<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserHasRole
{
  /**
   * Handle an incoming request.
   *
   * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
   */
  public function handle(Request $request, Closure $next, ...$roles): Response
  {
    if (!count($roles)) throw new \Exception('Roles must be provided to EnsureUserHasRole middleware');
    return $request->user()->hasRole(...$roles)
      ? $next($request)
      : abort(403, 'Unauthorized');
  }
}
