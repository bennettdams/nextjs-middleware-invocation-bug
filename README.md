## Reproduction repo for a bug of Next.js' middleware invocation

### Steps to reproduce


1. Install via `npx create-next-app@latest --ts --use-npm .`
2. Add a test page

    ```tsx
    // test.tsx
    import { NextPage } from "next/types"
    
    const Test: NextPage = () => {
        return <p>Test</p>
    }
    
    export default Test
    ```
3. Add Middleware that logs whenever it is invoked for our new `Test` page
    ```tsx
    // middleware.ts
    import { NextRequest, NextResponse } from "next/server";
    
    // Note: I'm using a root wildcard here, because in my code, I want to protect every single route for authentication
    export const config = {
      matcher: ["/:path*"],
    };
    
    export default async function _middleware(req: NextRequest) {
      const pathname = req.nextUrl.pathname;
    
      if (pathname === "/test") {
        console.log(
          `🔵 ${new Date().toISOString()} | Request for "Test" page | Method: ${
            req.method
          }`
        );
      }
    
      return NextResponse.next();
    }

    ```
4. `npm run build` and `npm run start`
5. Go to `/test` in the browser. Reload the page.

The result is **two** `console.log`s, even though it should be one.

---

I checked `v12.1.6`, where this problem does not exist. There's only one invocation as expected. To reproduce in the same repo:

1. `npm i next@12.1.6`
8. Rename `middleware.ts` to `_middleware.ts` and move it to the "pages" folder.