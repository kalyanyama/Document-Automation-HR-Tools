/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/generate-doc/route";
exports.ids = ["app/api/generate-doc/route"];
exports.modules = {

/***/ "(rsc)/./app/api/generate-doc/route.ts":
/*!***************************************!*\
  !*** ./app/api/generate-doc/route.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var googleapis__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! googleapis */ \"(rsc)/./node_modules/googleapis/build/src/index.js\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nasync function POST(req) {\n    try {\n        const body = await req.json();\n        const { values, templateID } = body;\n        const auth = new googleapis__WEBPACK_IMPORTED_MODULE_2__.google.auth.GoogleAuth({\n            keyFile: path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), \"credentials\", \"service-account.json\"),\n            scopes: [\n                \"https://www.googleapis.com/auth/drive\",\n                \"https://www.googleapis.com/auth/documents\"\n            ]\n        });\n        const authClient = await auth.getClient();\n        const docs = googleapis__WEBPACK_IMPORTED_MODULE_2__.google.docs({\n            version: \"v1\",\n            auth: authClient\n        });\n        const drive = googleapis__WEBPACK_IMPORTED_MODULE_2__.google.drive({\n            version: \"v3\",\n            auth: authClient\n        });\n        // Step 1: Copy the template\n        const copyResponse = await drive.files.copy({\n            fileId: templateID,\n            requestBody: {\n                name: `Offer Letter - ${values.name}`\n            }\n        });\n        const newDocId = copyResponse.data.id;\n        const docLink = `https://docs.google.com/document/d/${newDocId}/edit`;\n        // Step 2: Replace placeholders\n        const requests = Object.entries(values).map(([key, val])=>({\n                replaceAllText: {\n                    containsText: {\n                        text: `{{${key}}}`,\n                        matchCase: true\n                    },\n                    replaceText: val\n                }\n            }));\n        await docs.documents.batchUpdate({\n            documentId: newDocId,\n            requestBody: {\n                requests\n            }\n        });\n        await drive.permissions.create({\n            fileId: newDocId,\n            requestBody: {\n                role: \"reader\",\n                type: \"anyone\"\n            }\n        });\n        // Step 3: Export as PDF\n        const pdfRes = await drive.files.export({\n            fileId: newDocId,\n            mimeType: \"application/pdf\"\n        }, {\n            responseType: \"arraybuffer\"\n        });\n        const pdfBuffer = Buffer.from(pdfRes.data);\n        const base64Pdf = pdfBuffer.toString(\"base64\");\n        // return NextResponse.json({\n        //   success: true,\n        //   docLink,\n        //   pdf: base64Pdf, \n        // });\n        return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(Buffer.from(pdfRes.data), {\n            status: 200,\n            headers: {\n                \"Content-Type\": \"application/pdf\",\n                \"Content-Disposition\": `attachment; filename=\"${values.name}.pdf\"`\n            }\n        });\n    } catch (error) {\n        console.error(\"Error generating document:\", error);\n        return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(JSON.stringify({\n            error: \"Internal Server Error\",\n            details: error instanceof Error ? error.message : \"Unknown error\"\n        }), {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZXNrdG9wL0hpcmVXb2xmL2FwcC9hcGkvZ2VuZXJhdGUtZG9jL3JvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdvb2dsZSB9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5pbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IE5leHRSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcS5qc29uKCk7XG4gICAgY29uc3QgeyB2YWx1ZXMsIHRlbXBsYXRlSUQgfSA9IGJvZHk7XG5cbiAgICBjb25zdCBhdXRoID0gbmV3IGdvb2dsZS5hdXRoLkdvb2dsZUF1dGgoe1xuICAgICAga2V5RmlsZTogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIFwiY3JlZGVudGlhbHNcIiwgXCJzZXJ2aWNlLWFjY291bnQuanNvblwiKSxcbiAgICAgIHNjb3BlczogW1xuICAgICAgICBcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvZHJpdmVcIixcbiAgICAgICAgXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RvY3VtZW50c1wiLFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGF1dGhDbGllbnQgPSBhd2FpdCBhdXRoLmdldENsaWVudCgpO1xuICAgIGNvbnN0IGRvY3MgPSBnb29nbGUuZG9jcyh7IHZlcnNpb246IFwidjFcIiwgYXV0aDogYXV0aENsaWVudCB9KTtcbiAgICBjb25zdCBkcml2ZSA9IGdvb2dsZS5kcml2ZSh7IHZlcnNpb246IFwidjNcIiwgYXV0aDogYXV0aENsaWVudCB9KTtcblxuICAgIC8vIFN0ZXAgMTogQ29weSB0aGUgdGVtcGxhdGVcbiAgICBjb25zdCBjb3B5UmVzcG9uc2UgPSBhd2FpdCBkcml2ZS5maWxlcy5jb3B5KHtcbiAgICAgIGZpbGVJZDogdGVtcGxhdGVJRCxcbiAgICAgIHJlcXVlc3RCb2R5OiB7XG4gICAgICAgIG5hbWU6IGBPZmZlciBMZXR0ZXIgLSAke3ZhbHVlcy5uYW1lfWAsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgY29uc3QgbmV3RG9jSWQgPSBjb3B5UmVzcG9uc2UuZGF0YS5pZCE7XG4gICAgY29uc3QgZG9jTGluayA9IGBodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9kb2N1bWVudC9kLyR7bmV3RG9jSWR9L2VkaXRgO1xuXG4gICAgLy8gU3RlcCAyOiBSZXBsYWNlIHBsYWNlaG9sZGVyc1xuICAgIGNvbnN0IHJlcXVlc3RzID0gT2JqZWN0LmVudHJpZXModmFsdWVzKS5tYXAoKFtrZXksIHZhbF0pID0+ICh7XG4gICAgICByZXBsYWNlQWxsVGV4dDoge1xuICAgICAgICBjb250YWluc1RleHQ6IHsgdGV4dDogYHt7JHtrZXl9fX1gLCBtYXRjaENhc2U6IHRydWUgfSxcbiAgICAgICAgcmVwbGFjZVRleHQ6IHZhbCxcbiAgICAgIH0sXG4gICAgfSkpO1xuXG4gICAgYXdhaXQgZG9jcy5kb2N1bWVudHMuYmF0Y2hVcGRhdGUoe1xuICAgICAgZG9jdW1lbnRJZDogbmV3RG9jSWQsXG4gICAgICByZXF1ZXN0Qm9keTogeyByZXF1ZXN0cyB9LFxuICAgIH0pO1xuXG4gICAgYXdhaXQgZHJpdmUucGVybWlzc2lvbnMuY3JlYXRlKHtcbiAgICAgIGZpbGVJZDogbmV3RG9jSWQsXG4gICAgICByZXF1ZXN0Qm9keToge1xuICAgICAgICByb2xlOiBcInJlYWRlclwiLFxuICAgICAgICB0eXBlOiBcImFueW9uZVwiLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIC8vIFN0ZXAgMzogRXhwb3J0IGFzIFBERlxuICAgIGNvbnN0IHBkZlJlcyA9IGF3YWl0IGRyaXZlLmZpbGVzLmV4cG9ydChcbiAgICAgIHtcbiAgICAgICAgZmlsZUlkOiBuZXdEb2NJZCxcbiAgICAgICAgbWltZVR5cGU6IFwiYXBwbGljYXRpb24vcGRmXCIsXG4gICAgICB9LFxuICAgICAgeyByZXNwb25zZVR5cGU6IFwiYXJyYXlidWZmZXJcIiB9XG4gICAgKTtcblxuICAgIGNvbnN0IHBkZkJ1ZmZlciA9IEJ1ZmZlci5mcm9tKHBkZlJlcy5kYXRhKTtcbiAgICBjb25zdCBiYXNlNjRQZGYgPSBwZGZCdWZmZXIudG9TdHJpbmcoXCJiYXNlNjRcIik7XG5cbiAgICAvLyByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xuICAgIC8vICAgc3VjY2VzczogdHJ1ZSxcbiAgICAvLyAgIGRvY0xpbmssXG4gICAgLy8gICBwZGY6IGJhc2U2NFBkZiwgXG4gICAgLy8gfSk7XG5cbiAgICByZXR1cm4gbmV3IE5leHRSZXNwb25zZShCdWZmZXIuZnJvbShwZGZSZXMuZGF0YSksIHtcbiAgICAgIHN0YXR1czogMjAwLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL3BkZlwiLFxuICAgICAgICBcIkNvbnRlbnQtRGlzcG9zaXRpb25cIjogYGF0dGFjaG1lbnQ7IGZpbGVuYW1lPVwiJHt2YWx1ZXMubmFtZX0ucGRmXCJgLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZ2VuZXJhdGluZyBkb2N1bWVudDpcIiwgZXJyb3IpO1xuICAgIHJldHVybiBuZXcgTmV4dFJlc3BvbnNlKFxuICAgICAgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBlcnJvcjogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIixcbiAgICAgICAgZGV0YWlsczogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBcIlVua25vd24gZXJyb3JcIixcbiAgICAgIH0pLFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbImdvb2dsZSIsIk5leHRSZXNwb25zZSIsInBhdGgiLCJQT1NUIiwicmVxIiwiYm9keSIsImpzb24iLCJ2YWx1ZXMiLCJ0ZW1wbGF0ZUlEIiwiYXV0aCIsIkdvb2dsZUF1dGgiLCJrZXlGaWxlIiwiam9pbiIsInByb2Nlc3MiLCJjd2QiLCJzY29wZXMiLCJhdXRoQ2xpZW50IiwiZ2V0Q2xpZW50IiwiZG9jcyIsInZlcnNpb24iLCJkcml2ZSIsImNvcHlSZXNwb25zZSIsImZpbGVzIiwiY29weSIsImZpbGVJZCIsInJlcXVlc3RCb2R5IiwibmFtZSIsIm5ld0RvY0lkIiwiZGF0YSIsImlkIiwiZG9jTGluayIsInJlcXVlc3RzIiwiT2JqZWN0IiwiZW50cmllcyIsIm1hcCIsImtleSIsInZhbCIsInJlcGxhY2VBbGxUZXh0IiwiY29udGFpbnNUZXh0IiwidGV4dCIsIm1hdGNoQ2FzZSIsInJlcGxhY2VUZXh0IiwiZG9jdW1lbnRzIiwiYmF0Y2hVcGRhdGUiLCJkb2N1bWVudElkIiwicGVybWlzc2lvbnMiLCJjcmVhdGUiLCJyb2xlIiwidHlwZSIsInBkZlJlcyIsImV4cG9ydCIsIm1pbWVUeXBlIiwicmVzcG9uc2VUeXBlIiwicGRmQnVmZmVyIiwiQnVmZmVyIiwiZnJvbSIsImJhc2U2NFBkZiIsInRvU3RyaW5nIiwic3RhdHVzIiwiaGVhZGVycyIsImVycm9yIiwiY29uc29sZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJkZXRhaWxzIiwiRXJyb3IiLCJtZXNzYWdlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/generate-doc/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgenerate-doc%2Froute&page=%2Fapi%2Fgenerate-doc%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgenerate-doc%2Froute.ts&appDir=%2FUsers%2Fkalyanyama%2FDesktop%2FHireWolf%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fkalyanyama%2FDesktop%2FHireWolf&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgenerate-doc%2Froute&page=%2Fapi%2Fgenerate-doc%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgenerate-doc%2Froute.ts&appDir=%2FUsers%2Fkalyanyama%2FDesktop%2FHireWolf%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fkalyanyama%2FDesktop%2FHireWolf&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_kalyanyama_Desktop_HireWolf_app_api_generate_doc_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/generate-doc/route.ts */ \"(rsc)/./app/api/generate-doc/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/generate-doc/route\",\n        pathname: \"/api/generate-doc\",\n        filename: \"route\",\n        bundlePath: \"app/api/generate-doc/route\"\n    },\n    resolvedPagePath: \"/Users/kalyanyama/Desktop/HireWolf/app/api/generate-doc/route.ts\",\n    nextConfigOutput,\n    userland: _Users_kalyanyama_Desktop_HireWolf_app_api_generate_doc_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZnZW5lcmF0ZS1kb2MlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmdlbmVyYXRlLWRvYyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmdlbmVyYXRlLWRvYyUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmthbHlhbnlhbWElMkZEZXNrdG9wJTJGSGlyZVdvbGYlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGa2FseWFueWFtYSUyRkRlc2t0b3AlMkZIaXJlV29sZiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDZ0I7QUFDN0Y7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9Vc2Vycy9rYWx5YW55YW1hL0Rlc2t0b3AvSGlyZVdvbGYvYXBwL2FwaS9nZW5lcmF0ZS1kb2Mvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2dlbmVyYXRlLWRvYy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2dlbmVyYXRlLWRvY1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvZ2VuZXJhdGUtZG9jL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL2thbHlhbnlhbWEvRGVza3RvcC9IaXJlV29sZi9hcHAvYXBpL2dlbmVyYXRlLWRvYy9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgenerate-doc%2Froute&page=%2Fapi%2Fgenerate-doc%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgenerate-doc%2Froute.ts&appDir=%2FUsers%2Fkalyanyama%2FDesktop%2FHireWolf%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fkalyanyama%2FDesktop%2FHireWolf&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "http2":
/*!************************!*\
  !*** external "http2" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("http2");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "node:events":
/*!******************************!*\
  !*** external "node:events" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:events");

/***/ }),

/***/ "node:process":
/*!*******************************!*\
  !*** external "node:process" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:process");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:util");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/googleapis","vendor-chunks/google-auth-library","vendor-chunks/uuid","vendor-chunks/googleapis-common","vendor-chunks/math-intrinsics","vendor-chunks/gaxios","vendor-chunks/es-errors","vendor-chunks/whatwg-url","vendor-chunks/qs","vendor-chunks/jws","vendor-chunks/call-bind-apply-helpers","vendor-chunks/debug","vendor-chunks/json-bigint","vendor-chunks/google-logging-utils","vendor-chunks/get-proto","vendor-chunks/tr46","vendor-chunks/object-inspect","vendor-chunks/https-proxy-agent","vendor-chunks/has-symbols","vendor-chunks/gopd","vendor-chunks/gcp-metadata","vendor-chunks/function-bind","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/agent-base","vendor-chunks/node-fetch","vendor-chunks/webidl-conversions","vendor-chunks/url-template","vendor-chunks/supports-color","vendor-chunks/side-channel","vendor-chunks/side-channel-weakmap","vendor-chunks/side-channel-map","vendor-chunks/side-channel-list","vendor-chunks/safe-buffer","vendor-chunks/ms","vendor-chunks/jwa","vendor-chunks/is-stream","vendor-chunks/hasown","vendor-chunks/has-flag","vendor-chunks/gtoken","vendor-chunks/get-intrinsic","vendor-chunks/extend","vendor-chunks/es-object-atoms","vendor-chunks/es-define-property","vendor-chunks/dunder-proto","vendor-chunks/call-bound","vendor-chunks/buffer-equal-constant-time","vendor-chunks/bignumber.js","vendor-chunks/base64-js"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgenerate-doc%2Froute&page=%2Fapi%2Fgenerate-doc%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgenerate-doc%2Froute.ts&appDir=%2FUsers%2Fkalyanyama%2FDesktop%2FHireWolf%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fkalyanyama%2FDesktop%2FHireWolf&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();