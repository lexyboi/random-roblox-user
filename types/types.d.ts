export declare function checkVersion(): Promise<void>;
export declare function randomUser(
    attempt_count?: number,
    wanted_field?: string,
    enable_logs?: boolean
): Promise<Array<{ status: "Accepted"; user: any } | { status: "Failed"; id: number }>>;
