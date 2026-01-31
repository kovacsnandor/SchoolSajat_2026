<?php

namespace App\Http\Controllers;

use App\Models\Sport;
use App\Http\Requests\StoreSportRequest;
use App\Http\Requests\UpdateSportRequest;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\DB;
use PhpParser\Node\Stmt\TryCatch;

class SportController extends Controller
{
    public function index()
    {
        return $this->apiResponse(
            function () {
                return Sport::all();
            }
        );
    }
    public function indexAbc()
    {
        return $this->apiResponse(
            function () {
                return DB::table('sports')
                    ->select('id', 'sportNev')
                    ->orderBy('sportNev')
                    ->get();
            }
        );
    }

    public function show(int $id)
    {
        return $this->apiResponse(function () use ($id) {
            return Sport::findOrFail($id);
        });
    }

    public function store(StoreSportRequest $request)
    {
        return $this->apiResponse(
            function () use ($request) {
                return Sport::create($request->validated());
            }
        );
    }

    public function update(UpdateSportRequest $request, int $id)
    {
        return $this->apiResponse(function () use ($request, $id) {
            $row = Sport::findOrFail($id);
            $row->update($request->validated());
            return $row;
        });
    }

    public function destroy($id)
    {
        return $this->apiResponse(function () use ($id) {
            Sport::findOrFail($id)->delete();
            return ['id' => $id];
        });
    }

    //ping: /indexpaging/{page}/{per_page}/{column}/{direction}/{search}
    //csak lapozás: /indexpaging/2/10/id/asc/

    public function indexPaging($page, $per_page = 10, $column, $direction, $search = null)
    {
        return $this->apiResponse(function () use ($page, $per_page, $column, $direction, $search) {
            if (!is_numeric($page) || $page < 1) {
                $page = 1;
            }

            if (!is_numeric($per_page) || $per_page < 1) {
                $per_page = 10; // Maximáljuk is a lapméretet, ne lehessen 1 milliót kérni
            }

            // 1. A lekérdezés alapjainak felépítése (Query Builder)
            //késleltett betöltés: láncilással építjük a lekérdezést
            $query = Sport::query();

            // 2. Szűrés (ha van keresőszó)
            if (!empty($search) && $search !== 'all') {
                $query->where(function ($q) use ($search) {
                    $q->where('sportNev', 'like', "%{$search}%");
                    // ->orWhere('description', 'like', "%{$search}%");
                });
            }

            // 3. Sorbarendezés
            $allowedColumns = ['id', 'sportNev']; // Biztonsági lista
            $sortColumn = in_array($column, $allowedColumns) ? $column : 'id';
            $sortDirection = strtolower($direction) === 'desc' ? 'desc' : 'asc';
            $query->orderBy($sortColumn, $sortDirection);
            //Felépült a query, de még nem nyúltunk az adatbázishoz

            // 4. ELSŐ PRÓBÁLKOZÁS: Lekérjük a kért oldalt
            // A 4. paraméter ($page) mondja meg a paginátornak, hanyadik oldalt akarjuk
            $rows = $query->paginate($per_page, ['*'], 'page', $page);

            // 5. ELLENŐRZÉS: Ha túlmentünk a határon (üres, de van tartalom)
            if ($rows->isEmpty() && $rows->lastPage() > 0 && $page > $rows->lastPage()) {
                $lastPage = $rows->lastPage();

                // MÁSODIK PRÓBÁLKOZÁS: Lekérjük az utolsó létező oldalt
                // Fontos: a $query-t újra kell futtatni az utolsó oldallal
                $rows = $query->paginate($per_page, ['*'], 'page', $lastPage);
            }
            return [
                'data' => $rows->items(), // Csak a tiszta modellek listája
                'meta' => [
                    'current_page' => $rows->currentPage(),
                    'last_page' => $rows->lastPage(),
                    'total' => $rows->total(),
                ]
            ];
        });
    }
}
