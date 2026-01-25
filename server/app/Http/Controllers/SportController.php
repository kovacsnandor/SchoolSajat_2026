<?php

namespace App\Http\Controllers;

use App\Models\Sport;
use App\Http\Requests\StoreSportRequest;
use App\Http\Requests\UpdateSportRequest;
use Illuminate\Database\QueryException;
use Illuminate\Pagination\Paginator;
use PhpParser\Node\Stmt\TryCatch;

class SportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        try {
            $rows = Sport::all();

            $status = 200;
            $data = [
                'message' => 'OK',
                'data' => $rows
            ];
        } catch (\Exception $e) {
            $status = 500;
            $data = [
                'message' => "Server error: {$e->getCode()}",
                'data' => $rows
            ];
        }

        return response()->json($data, $status, options: JSON_UNESCAPED_UNICODE);
    }

    //ping: /indexpaging/{page}/{per_page}/{column}/{direction}/{search}
    //csak lapozás: /indexpaging/2/10/id/asc/

    public function indexPaging($page, $per_page = 10, $column, $direction, $search = null)
    {
        //
        if (!is_numeric($page) || $page < 1) {
            $page = 1;
        }

        if (!is_numeric($per_page) || $per_page < 1) {
            $per_page = 10; // Maximáljuk is a lapméretet, ne lehessen 1 milliót kérni
        }
        try {

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

            $status = 200;
            $data = [
                'message' => 'OK',
                'data' => $rows->items(),
                'meta' => [
                    'current_page' => $rows->currentPage(),
                    'last_page' => $rows->lastPage(),
                    'total' => $rows->total(),
                ]
            ];
        } catch (\Exception $e) {
            $status = 500;
            $data = [
                'message' => "Server error: {$e->getCode()}",
                'data' => $rows
            ];
        }

        return response()->json($data, $status, options: JSON_UNESCAPED_UNICODE);
    }

    //Működő, csak lapozó változat
    public function indexPaging_old($page, $per_page = 10)
    {
        //
        if (!is_numeric($page) || $page < 1) {
            $page = 1;
        }

        if (!is_numeric($per_page) || $per_page < 1) {
            $per_page = 10; // Maximáljuk is a lapméretet, ne lehessen 1 milliót kérni
        }
        try {
            // Kényszerítjük a Laravelt, hogy a mi $page változónkat használja
            // alapértelmezett query paraméter helyett
            Paginator::currentPageResolver(function () use ($page) {
                return $page;
            });
            //1. lépés: Megpróbáljuk lekérni a kért oldalt
            $rows = Sport::paginate($per_page);

            // 2. lépés: Ellenőrizzük, hogy túlmentünk-e a határon
            // Ha üres a lista, de az utolsó oldal kisebb, mint amit kértünk
            if ($rows->isEmpty() && $rows->lastPage() > 0 && $page > $rows->lastPage()) {
                $lastPage = $rows->lastPage();

                // Újra beállítjuk a resolvert az utolsó létező oldalra
                Paginator::currentPageResolver(fn() => $lastPage);
                $rows = Sport::paginate($per_page);
            }


            $status = 200;
            $data = [
                'message' => 'OK',
                'data' => $rows->items(),
                'meta' => [
                    'current_page' => $rows->currentPage(),
                    'last_page' => $rows->lastPage(),
                    'total' => $rows->total(),
                ]
            ];
        } catch (\Exception $e) {
            $status = 500;
            $data = [
                'message' => "Server error: {$e->getCode()}",
                'data' => $rows
            ];
        }

        return response()->json($data, $status, options: JSON_UNESCAPED_UNICODE);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSportRequest $request)
    {
        //
        try {
            $row = Sport::create($request->all());

            $data = [
                'message' => 'ok',
                'data' => $row
            ];
            // Sikeres válasz: 201 Created kód ajánlott új erőforrás létrehozásakor
            return response()->json($data, 201, options: JSON_UNESCAPED_UNICODE);
        } catch (QueryException $e) {
            // Ellenőrizzük, hogy ez egy "Duplicate entry for key" hiba-e (MySQL hibakód: 23000 vagy 1062)
            if ($e->getCode() == 23000 || str_contains($e->getMessage(), 'Duplicate entry')) {
                $data = [
                    'message' => 'Insert error: The given name already exists, please choose another one',
                    'data' => [
                        'sportNev' => $request->input('sportNev') // Visszaküldhetjük, mi volt a hibás
                    ]
                ];
                // Kliens hiba, ami jelzi a kérés érvénytelenségét
                return response()->json($data, 409, options: JSON_UNESCAPED_UNICODE); // 409 Conflict ajánlott
            }

            // Ha nem ez a hiba volt, dobjuk tovább az eredeti kivételt, vagy kezeljük másképp
            throw $e;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Sport $id)
    {
        //
        $row = Sport::find($id);
        if ($row) {
            $status = 200;
            $data = [
                'message' => 'OK',
                'data' => $row[0]
            ];
        } else {

            $status = 404;
            $data = [
                'message' => "Not found id: $id",
                'data' => null
            ];
        }

        return response()->json($data, $status, options: JSON_UNESCAPED_UNICODE);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSportRequest $request, int $id)
    {
        //


        try {
            $row = Sport::find($id);
            if ($row) {
                $status = 200;
                $row->update($request->all());
                $data = [
                    'message' => 'OK',
                    'data' => [$row],

                ];
            } else {

                $status = 404;
                $data = [
                    'message' => "Patch error. Not found id: $id",
                    'data' => null
                ];
            }
            return response()->json($data, $status, options: JSON_UNESCAPED_UNICODE);
        } catch (QueryException $e) {
            // Ellenőrizzük, hogy ez egy "Duplicate entry for key" hiba-e (MySQL hibakód: 23000 vagy 1062)
            if ($e->getCode() == 23000 || str_contains($e->getMessage(), 'Duplicate entry')) {
                $data = [
                    'message' => 'Insert error: The given name already exists, please choose another one',
                    'data' => [
                        'sportNev' => $request->input('sportNev') // Visszaküldhetjük, mi volt a hibás
                    ]
                ];
                // Kliens hiba, ami jelzi a kérés érvénytelenségét
                return response()->json($data, 409, options: JSON_UNESCAPED_UNICODE); // 409 Conflict ajánlott
            }

            // Ha nem ez a hiba volt, dobjuk tovább az eredeti kivételt, vagy kezeljük másképp
            throw $e;
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        // Megkeressük az osztályt az ID alapján
        try {
            $sport = Sport::find($id);

            if (!$sport) {
                return response()->json([
                    'message' => 'Not found id: ' . $id,
                    'data' => null
                ], 404, [], JSON_UNESCAPED_UNICODE);
            }

            // Törlés
            $sport->delete();

            return response()->json([
                'message' => 'OK',
                'data' => null
            ], 200, [], JSON_UNESCAPED_UNICODE);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Server error: {$e->getCode()}",
                'data' => null
            ], 500, [], JSON_UNESCAPED_UNICODE);
        }
    }
}
