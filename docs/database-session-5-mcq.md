# Advanced Databases — Session 5: Transactions & ACID Properties

## Multiple-choice question bank

**Scope:** `DB5(2).pdf`, *Transactions & ACID Properties* (PDF pages 1–36). The instructor’s *Quiz 4: Concurrency Control* is used only to calibrate the difficulty and to confirm overlapping Session 5 concepts. Locking mechanics, `SELECT ... FOR UPDATE`, deadlocks, starvation, wait-for graphs and phantom reads are **not assessed** in this bank.

**Instructions:** Select one best answer (A, B, C or D). Each question has exactly one correct answer. PDF page references identify the teaching source; where a Quiz 4 question clarifies the same topic, it is identified separately.

### Q001. What is a database transaction in the lecture?

A. A permanent copy of a table created before every SQL command.  
B. A database connection that can execute only one SQL statement.  
C. A logical unit of database processing treated as a single unit of work.  
D. A query plan that specifies the fastest execution order.  

**Correct answer:** C

**Explanation:** A transaction groups one or more database operations into a logical unit; it can succeed as a unit or be rolled back.

**Source:** `DB5(2).pdf`, PDF p. 6.

### Q002. A transfer deducts $100 from Alice and then credits $100 to Bob. The server crashes between the statements. What prevents a completed deduction without its matching credit?

A. Running both updates as separate successful autocommit statements.  
B. Committing the debit before executing the credit.  
C. Executing both statements in one transaction and committing only after both succeed.  
D. Executing the credit after restarting without checking the first step.  

**Correct answer:** C

**Explanation:** The two balance updates form one logical transaction. If it does not commit, the changes are not partially preserved.

**Source:** `DB5(2).pdf`, PDF p. 5-6, 8.

### Q003. Which command explicitly starts a transaction block in PostgreSQL?

A. BEGIN;  
B. SAVEPOINT start;  
C. ROLLBACK;  
D. COMMIT;  

**Correct answer:** A

**Explanation:** BEGIN establishes the boundary within which subsequent operations can be committed or rolled back together.

**Source:** `DB5(2).pdf`, PDF p. 8.

### Q004. A valid UPDATE has run inside BEGIN, but COMMIT has not occurred. What does COMMIT normally accomplish?

A. It finishes the transaction and makes its changes permanent.  
B. It undoes the UPDATE but keeps the transaction open.  
C. It only releases a savepoint while keeping BEGIN open.  
D. It creates a savepoint without ending the transaction.  

**Correct answer:** A

**Explanation:** COMMIT is the success boundary of an explicit transaction: its changes become durable and available to other transactions according to visibility rules.

**Source:** `DB5(2).pdf`, PDF p. 8.

### Q005. A transaction updates inventory and inserts an order. Both statements succeed, but the application issues ROLLBACK rather than COMMIT. What persists from those statements?

A. Only the INSERT persists.  
B. Only the UPDATE persists.  
C. Neither change persists.  
D. Both changes persist because they executed successfully.  

**Correct answer:** C

**Explanation:** ROLLBACK cancels all work in the transaction, even if individual statements executed without error.

**Source:** `DB5(2).pdf`, PDF p. 8, 15.

### Q006. With PostgreSQL autocommit enabled and no explicit BEGIN, what happens after one valid standalone UPDATE?

A. It stays uncommitted until another UPDATE follows.  
B. It requires a SAVEPOINT to become permanent.  
C. It is automatically rolled back at session end.  
D. That statement is committed automatically.  

**Correct answer:** D

**Explanation:** In the default autocommit mode, each successfully executed standalone statement is its own transaction.

**Source:** `DB5(2).pdf`, PDF p. 10.

### Q007. An e-commerce operation must update a stock count and write a matching paid order. Which approach best follows the lecture?

A. Let each statement autocommit separately.  
B. Perform the order INSERT only if the stock UPDATE has already committed.  
C. Wrap both operations in one explicit transaction.  
D. Run the operations in two unrelated database sessions.  

**Correct answer:** C

**Explanation:** The two changes describe one business action, so an explicit transaction avoids partial completion.

**Source:** `DB5(2).pdf`, PDF p. 8, 10.

### Q008. Why might one explicit transaction containing 1,000 INSERT statements be faster than 1,000 individual autocommit INSERTs?

A. It permanently disables constraints on the inserted rows.  
B. It prevents PostgreSQL from writing any WAL records.  
C. It reduces the number of commit operations and associated WAL-flush overhead.  
D. It performs the INSERTs without recording any transaction boundaries.  

**Correct answer:** C

**Explanation:** Fewer commits can reduce repeated durability-related I/O overhead. The statements are not exempt from integrity checks.

**Source:** `DB5(2).pdf`, PDF p. 10, 22, 28.

### Q009. According to the lecture’s brief MVCC explanation, how are new row versions from an aborted transaction treated?

A. They overwrite the older versions even though the transaction failed.  
B. They are ignored rather than becoming committed transaction effects.  
C. They are committed one by one before the transaction aborts.  
D. They automatically become visible to other sessions after the abort.  

**Correct answer:** B

**Explanation:** The Atomicity slide cites MVCC and the ability to disregard uncommitted new versions when a transaction is rolled back. This question does not require Session 6 locking mechanics.

**Source:** `DB5(2).pdf`, PDF p. 15.

### Q010. During which transaction state are SQL operations being executed?

A. Aborted.  
B. Committed.  
C. Partially Committed.  
D. Active.  

**Correct answer:** D

**Explanation:** Active is the initial execution state, before a success or failure transition.

**Source:** `DB5(2).pdf`, PDF p. 9.

### Q011. What does the Partially Committed state mean in the lecture?

A. The final statement has executed, but the work is not yet safely durable.  
B. Some successful statements have already become durable while the rest are pending.  
C. The transaction failed and is waiting for ROLLBACK.  
D. The server has committed locally but is waiting for another database to respond.  

**Correct answer:** A

**Explanation:** Partially Committed lies between finishing the final statement and securing the commit.

**Source:** `DB5(2).pdf`, PDF p. 9.

### Q012. Which sequence represents a successful transaction lifecycle?

A. Active → Aborted → Committed.  
B. Active → Partially Committed → Committed.  
C. Committed → Active → Failed.  
D. Failed → Partially Committed → Committed.  

**Correct answer:** B

**Explanation:** The slide distinguishes the success path from the failure path (Active → Failed → Aborted).

**Source:** `DB5(2).pdf`, PDF p. 9.

### Q013. A transaction encounters an error and is restored to its pre-transaction state. What is its final state?

A. Aborted.  
B. Active.  
C. Partially Committed.  
D. Committed.  

**Correct answer:** A

**Explanation:** Failed describes the error state; Aborted describes the outcome after the transaction is undone.

**Source:** `DB5(2).pdf`, PDF p. 9.

### Q014. Inside BEGIN, UPDATE A succeeds, UPDATE B violates a foreign key, UPDATE C is valid, and the client issues COMMIT without recovering the transaction. What is the result in PostgreSQL?

A. A and C are committed, while B is skipped.  
B. Only A is committed because B stopped execution.  
C. The transaction is rolled back; neither A nor C is committed.  
D. All three updates are saved once COMMIT is called.  

**Correct answer:** C

**Explanation:** An error leaves a PostgreSQL transaction in the failed state. Later ordinary commands are rejected, and COMMIT cannot preserve the earlier work.

**Source:** `DB5(2).pdf`, PDF p. 11.

### Q015. After an invalid UPDATE causes an explicit transaction to enter the failed state, which command from the lecture can end that unsuccessful block?

A. SELECT 1;  
B. ROLLBACK;  
C. BEGIN;  
D. UPDATE film SET rental_rate = 1;  

**Correct answer:** B

**Explanation:** Without a usable savepoint, the transaction must be rolled back before ordinary database operations can resume.

**Source:** `DB5(2).pdf`, PDF p. 11.

### Q016. In the failed-transaction example, why does the first valid change to G-rated film prices disappear?

A. The first UPDATE was implicitly committed as soon as it finished.  
B. The transaction automatically created a new savepoint at its first UPDATE.  
C. The third UPDATE canceled the first by setting prices for a different film rating.  
D. The later foreign-key violation aborts the transaction containing that earlier change.  

**Correct answer:** D

**Explanation:** Atomicity is evaluated across the transaction rather than separately for each previously successful statement.

**Source:** `DB5(2).pdf`, PDF p. 11, 15.

### Q017. Which ACID property is described as “All or nothing”?

A. Durability.  
B. Atomicity.  
C. Isolation.  
D. Consistency.  

**Correct answer:** B

**Explanation:** Atomicity prevents partial transaction effects when some steps fail.

**Source:** `DB5(2).pdf`, PDF p. 14-15.

### Q018. Which ACID property requires a transaction to move the database between states that satisfy its defined rules?

A. Isolation.  
B. Atomicity.  
C. Durability.  
D. Consistency.  

**Correct answer:** D

**Explanation:** Consistency concerns declared constraints and business rules, not just the completion of a statement.

**Source:** `DB5(2).pdf`, PDF p. 14, 17.

### Q019. A CHECK constraint requires film.replacement_cost >= 1.00. An UPDATE attempts to set replacement_cost = -5.00. Which property is being enforced by rejecting the update?

A. Consistency.  
B. Durability.  
C. Isolation.  
D. Atomicity.  

**Correct answer:** A

**Explanation:** The CHECK rule rejects a value outside the database’s valid state.

**Source:** `DB5(2).pdf`, PDF p. 17-18.

### Q020. Which list contains only mechanisms explicitly identified as supporting database consistency in the lecture?

A. Primary/foreign-key constraints, CHECK constraints, and triggers.  
B. Indexes, WAL flushes, and transaction state transitions.  
C. WAL records, buffer hits, and query plans.  
D. Transaction snapshots, ORDER BY, and SQL joins.  

**Correct answer:** A

**Explanation:** The slides identify keys, CHECK rules and triggers as examples of integrity/business rules.

**Source:** `DB5(2).pdf`, PDF p. 17.

### Q021. Session A changes a film price but has not committed. A separate session reads the previous committed price. Which ACID property explains this behavior?

A. Consistency.  
B. Isolation.  
C. Atomicity.  
D. Durability.  

**Correct answer:** B

**Explanation:** The second session does not see Session A’s uncommitted change in the lecture’s isolation demonstration.

**Source:** `DB5(2).pdf`, PDF p. 12, 19.

### Q022. Which ACID property guarantees that a committed change survives a power failure?

A. Durability.  
B. Isolation.  
C. Consistency.  
D. Atomicity.  

**Correct answer:** A

**Explanation:** Durability preserves committed results through crashes; WAL is the mechanism emphasized in the lecture.

**Source:** `DB5(2).pdf`, PDF p. 14, 21-22.

### Q023. In the lecture’s double-spending scenario, transaction B must wait while transaction A updates the same account. Which ACID property is illustrated by this protection?

A. Atomicity.  
B. Durability.  
C. Isolation.  
D. Consistency.  

**Correct answer:** C

**Explanation:** Isolation, supported by the locking behavior in this particular banking example, prevents concurrent actions from interfering.

**Source:** `DB5(2).pdf`, PDF p. 26-27.

### Q024. A banking transfer must deduct money from one account and credit another. Which ACID property specifically requires those two effects to succeed together?

A. Consistency.  
B. Atomicity.  
C. Isolation.  
D. Durability.  

**Correct answer:** B

**Explanation:** Both transfer legs form one indivisible business operation.

**Source:** `DB5(2).pdf`, PDF p. 5, 15, 27.

### Q025. An ML training pipeline reads changing data while parallel transactions are modifying the same database. Which ACID property is most directly relevant to avoiding inconsistent training reads?

A. Durability.  
B. Consistency.  
C. Atomicity.  
D. Isolation.  

**Correct answer:** D

**Explanation:** The lecture links isolation to stable reading behavior and reproducible data processing.

**Source:** `DB5(2).pdf`, PDF p. 19, 24.

### Q026. An AI service writes both model metadata and its associated audit record as one transaction. After the transaction commits, the server crashes. Which pair of ACID properties addresses both the completeness and persistence of this update?

A. Isolation ensures both records commit together; Consistency replaces the need for recovery.  
B. Atomicity ensures both records commit together; Durability preserves that commit after a crash.  
C. Durability prevents incomplete multi-step work; Isolation removes committed WAL records.  
D. Consistency guarantees all physical data pages are written; Atomicity prevents power loss.  

**Correct answer:** B

**Explanation:** Atomicity governs the all-or-nothing relationship between the two records; Durability protects the completed commit from later system failure.

**Source:** `DB5(2).pdf`, PDF p. 15, 21-24.

### Q027. A transaction attempts to insert a row with a foreign key that refers to no existing parent. Why should the operation fail?

A. A valid transaction may ignore foreign keys until its next successful COMMIT.  
B. The transaction must respect the database’s referential-integrity rules.  
C. A completed INSERT automatically creates its missing parent row.  
D. A successful earlier statement overrides foreign-key checks for later statements.  

**Correct answer:** B

**Explanation:** Foreign keys are integrity constraints; a transaction does not override them.

**Source:** `DB5(2).pdf`, PDF p. 11, 17.

### Q028. What is the main problem with 1,000 separately committed operations when they are intended to form one indivisible data-processing batch?

A. A failure can leave some operations committed and others incomplete.  
B. All successful INSERTs are undone together after the first later error.  
C. The database guarantees all 1,000 inserts are one atomic unit anyway.  
D. A partial batch automatically becomes a SAVEPOINT-controlled transaction.  

**Correct answer:** A

**Explanation:** Without one transaction boundary for the batch, earlier successful statements have already committed by the time a later one fails.

**Source:** `DB5(2).pdf`, PDF p. 10, 15, 24, 28.

### Q029. A transaction fails after 99 successful updates but before its 100th update finishes. Which outcome is required by Atomicity?

A. The 99 earlier updates are retained because each one was valid.  
B. Earlier changes persist if they were already written into the WAL.  
C. All 99 earlier updates in that uncommitted transaction must be undone.  
D. COMMIT can preserve the 99 successes even while the transaction remains failed.  

**Correct answer:** C

**Explanation:** Atomicity covers the whole logical unit: a partially completed uncommitted transaction must not leave persistent partial changes.

**Source:** `DB5(2).pdf`, PDF p. 15-16.

### Q030. Which ordering goes from least to most restrictive among the four standard isolation levels listed in the slides?

A. Serializable → Read Committed → Repeatable Read → Read Uncommitted.  
B. Read Committed → Read Uncommitted → Serializable → Repeatable Read.  
C. Repeatable Read → Read Uncommitted → Read Committed → Serializable.  
D. Read Uncommitted → Read Committed → Repeatable Read → Serializable.  

**Correct answer:** D

**Explanation:** The slide lists four levels in increasing strictness, ending with Serializable.

**Source:** `DB5(2).pdf`, PDF p. 20.

### Q031. What is the default isolation level discussed for PostgreSQL in the lecture?

A. Read Committed.  
B. Read Uncommitted.  
C. Repeatable Read.  
D. Serializable.  

**Correct answer:** A

**Explanation:** The lecture identifies Read Committed as the behavior used instead of Read Uncommitted in PostgreSQL.

**Source:** `DB5(2).pdf`, PDF p. 20.

### Q032. An application selects the READ UNCOMMITTED isolation level in PostgreSQL. Which effective behavior is described by the accompanying lecturer quiz?

A. PostgreSQL exposes all uncommitted updates to every session.  
B. PostgreSQL converts it into Serializable.  
C. PostgreSQL rejects the isolation-level setting rather than treating it as Read Committed.  
D. PostgreSQL treats it like Read Committed, so uncommitted changes remain invisible.  

**Correct answer:** D

**Explanation:** The session slide says PostgreSQL does not support a distinct Read Uncommitted behavior; Quiz 4 clarifies that the accepted setting acts as Read Committed.

**Source:** `DB5(2).pdf`, PDF p. 20; Quiz 4 Q20.

### Q033. Under Read Committed, T1 reads a film price of 4.99. T2 changes it to 0.99 and commits. T1 issues the same SELECT again after that commit. What can T1 see?

A. 4.99, because Read Committed fixes one snapshot for the whole transaction.  
B. An uncommitted intermediate value chosen by T2.  
C. 0.99, because the second statement can see T2’s committed change.  
D. T1 must wait until T2 disconnects before any subsequent SELECT can run.  

**Correct answer:** C

**Explanation:** Read Committed evaluates committed visibility separately for each statement, which can produce two different results.

**Source:** `DB5(2).pdf`, PDF p. 20; Quiz 4 Q10.

### Q034. Which visibility rule best characterizes Repeatable Read in the lecture?

A. Each statement must read the latest uncommitted value.  
B. A new committed-data snapshot is selected independently for every statement.  
C. The transaction continues to use a consistent snapshot for its reads.  
D. It allows reads of data that other transactions have not committed.  

**Correct answer:** C

**Explanation:** Unlike Read Committed, Repeatable Read keeps the same snapshot across subsequent queries in the transaction.

**Source:** `DB5(2).pdf`, PDF p. 20; Quiz 4 Q19.

### Q035. T1 is using Repeatable Read. It reads a balance, T2 later commits a different balance, and T1 repeats the read within the same transaction. Which expectation matches the lecture’s snapshot concept?

A. T1 continues to read the value from its established transaction snapshot.  
B. T1 must see T2’s latest value immediately.  
C. T1 reads T2’s value before T2 commits.  
D. T1 can see only the changes that T2 made before its COMMIT.  

**Correct answer:** A

**Explanation:** Repeatable Read does not refresh its snapshot for each later statement as Read Committed does.

**Source:** `DB5(2).pdf`, PDF p. 20; Quiz 4 Q19.

### Q036. Which isolation level is defined as making transaction outcomes behave as if transactions ran one after another?

A. Read Committed.  
B. Read Uncommitted.  
C. Repeatable Read.  
D. Serializable.  

**Correct answer:** D

**Explanation:** Serializable provides the strongest standard isolation guarantee in the session.

**Source:** `DB5(2).pdf`, PDF p. 20, 28.

### Q037. In the slide’s two-session film-price demonstration, Session A updates rental_rate to 9.99 without COMMIT. What should Session B’s ordinary SELECT return?

A. The new 9.99 values despite the missing commit.  
B. No rows until Session A explicitly releases all its changes.  
C. The prior committed rental_rate values.  
D. The original prices only after waiting for Session A to end.  

**Correct answer:** C

**Explanation:** The sample demonstrates that a concurrent ordinary reader does not see the writer’s uncommitted modifications.

**Source:** `DB5(2).pdf`, PDF p. 12, 19.

### Q038. What does the lecture identify as a major performance consideration when choosing stricter isolation?

A. Serializable automatically removes the need for transaction coordination.  
B. Stronger isolation can increase waiting or coordination overhead.  
C. Stricter isolation always reduces the time required to commit.  
D. Read Committed guarantees the same snapshot for every statement in a transaction.  

**Correct answer:** B

**Explanation:** The throughput discussion associates strong safety guarantees with coordination costs and potential latency.

**Source:** `DB5(2).pdf`, PDF p. 20, 28.

### Q039. What does WAL stand for in PostgreSQL?

A. Write-Ahead Logging.  
B. Write-After Loading.  
C. Window Aggregation Layer.  
D. Write-Allocated Locking.  

**Correct answer:** A

**Explanation:** WAL is the transaction logging technique the lecture identifies as the basis for durability.

**Source:** `DB5(2).pdf`, PDF p. 22.

### Q040. In the WAL workflow, what must happen before PostgreSQL can report a durable COMMIT under the lecture’s stated setup?

A. All main-table pages must be rewritten before logging begins.  
B. The database must discard the log file.  
C. The WAL records must be removed after the last statement finishes.  
D. The required WAL records must be flushed to disk.  

**Correct answer:** D

**Explanation:** The lecture’s sequence is log the changes, flush the log, and then complete the commit.

**Source:** `DB5(2).pdf`, PDF p. 21-22.

### Q041. Why can WAL logging be faster than immediately updating all scattered table pages?

A. WAL never writes anything to persistent storage.  
B. The WAL records can be appended sequentially instead of requiring scattered writes.  
C. Logging automatically removes the need to enforce constraints.  
D. Writing WAL bypasses the need to flush anything to durable storage.  

**Correct answer:** B

**Explanation:** Sequential I/O typically reduces seek/write overhead compared with random updates to many data pages.

**Source:** `DB5(2).pdf`, PDF p. 21-22; Quiz 4 Q5.

### Q042. A transaction has committed successfully, but its modified main data pages have not all been written. The server loses power. Which explanation best supports recovery?

A. Main data pages always reach disk before a COMMIT is reported.  
B. The engine must reconstruct all changes from application memory.  
C. The database discards all committed transactions after a restart.  
D. Durable WAL can be replayed to recover the committed effects.  

**Correct answer:** D

**Explanation:** A WAL-backed commit does not require all dirty data pages to have been flushed first; recovery can replay recorded changes.

**Source:** `DB5(2).pdf`, PDF p. 21-22; Quiz 4 Q1.

### Q043. At the time of a crash, transaction T1 had committed and transaction T2 had not. After recovery, which outcome follows Atomicity and Durability?

A. T1 remains committed; T2’s uncommitted effects do not become committed.  
B. Both are committed because their SQL statements already ran.  
C. Both are lost because the operating system restarted.  
D. T2 is committed automatically before T1 is replayed.  

**Correct answer:** A

**Explanation:** Crash recovery preserves committed work while excluding incomplete transactions.

**Source:** `DB5(2).pdf`, PDF p. 16, 21-22; Quiz 4 Q2.

### Q044. Where does the session say PostgreSQL stores its write-ahead log records?

A. In the pg_wal area.  
B. In the query optimizer’s pg_stats statistics.  
C. Only inside the application’s RAM.  
D. Only in the main table pages, without a separate log.  

**Correct answer:** A

**Explanation:** The slide names pg_wal as the area holding WAL records, which support crash recovery.

**Source:** `DB5(2).pdf`, PDF p. 22, 34.

### Q045. Why does the slide distinguish a committed change from a Partially Committed transaction?

A. The final SQL statement has completed, so durability is already guaranteed.  
B. The committed transaction has crossed the durability boundary.  
C. The only difference is whether the transaction ran one or several statements.  
D. Both states describe transactions whose errors have already been rolled back.  

**Correct answer:** B

**Explanation:** Executing the final statement is not identical to completing the durable commit.

**Source:** `DB5(2).pdf`, PDF p. 9, 21-22.

### Q046. Which trade-off is explicitly associated with strict durability in the session?

A. Durability avoids disk I/O but increases the risk of losing a commit.  
B. Commit processing may incur latency while the WAL is made durable.  
C. Durability requires all data pages to be synchronously rewritten on each COMMIT.  
D. Durability removes the need for any disk writes.  

**Correct answer:** B

**Explanation:** Ensuring a durable log requires persistent I/O; the lecture contrasts this cost with higher throughput.

**Source:** `DB5(2).pdf`, PDF p. 21-22, 28.

### Q047. What does SAVEPOINT user_created do inside an open transaction?

A. It commits all statements executed before that point.  
B. It finalizes all earlier changes without ending the outer transaction.  
C. It marks the start of a second autocommit transaction.  
D. It marks a position to which part of the transaction can later be rolled back.  

**Correct answer:** D

**Explanation:** SAVEPOINT provides a named rollback target while keeping the surrounding transaction open.

**Source:** `DB5(2).pdf`, PDF p. 32.

### Q048. A transaction inserts a customer, creates SAVEPOINT user_created, and then fails while inserting an optional offer. It executes ROLLBACK TO user_created and COMMIT. What is retained?

A. Only the optional offer; the customer is removed.  
B. The customer insertion, assuming it was valid; the failed optional work is not retained.  
C. Neither operation, because a savepoint cannot recover from an error.  
D. Both operations, because a savepoint forces a COMMIT.  

**Correct answer:** B

**Explanation:** ROLLBACK TO undoes work performed after the savepoint and allows the earlier work to be committed.

**Source:** `DB5(2).pdf`, PDF p. 32; Quiz 4 Q9.

### Q049. Why is ROLLBACK TO a valid savepoint useful after a statement error in PostgreSQL?

A. It makes the failed optional statement valid without changing its input.  
B. It commits only the changes performed before the failed statement.  
C. It can recover the transaction from the failed state while preserving earlier work.  
D. It ends the transaction and discards the earlier successful operations.  

**Correct answer:** C

**Explanation:** A rollback to the existing savepoint clears the failed subtransaction and undoes later work, so the outer transaction can continue.

**Source:** `DB5(2).pdf`, PDF p. 11, 32.

### Q050. What distinguishes a full ROLLBACK from ROLLBACK TO user_created?

A. A full ROLLBACK cancels the whole transaction; ROLLBACK TO undoes work since the named savepoint.  
B. A full ROLLBACK cancels only the last statement; ROLLBACK TO preserves later work.  
C. ROLLBACK TO commits all earlier work immediately, while full ROLLBACK waits for COMMIT.  
D. Both commands always undo every change since BEGIN.  

**Correct answer:** A

**Explanation:** Savepoints support partial recovery within an otherwise still-open transaction.

**Source:** `DB5(2).pdf`, PDF p. 8, 32.

### Q051. In the DVD rental lab, UPDATE rental sets return_date, then INSERT payment fails because payment_date is an invalid date literal. No savepoint was created. What happens to the rental update if the transaction is ended?

A. The return_date is committed because UPDATE ran first.  
B. The payment INSERT succeeds after PostgreSQL ignores the date.  
C. The attempted return_date update is not committed.  
D. The invalid payment value is stored as the current date.  

**Correct answer:** C

**Explanation:** The lab intentionally makes the payment insert fail to verify the all-or-nothing rule for the transaction.

**Source:** `DB5(2).pdf`, PDF p. 30-31.

### Q052. A staff-registration transaction successfully creates a new staff row, sets a savepoint, then fails while assigning a non-existent store_id. What should the application do to preserve the staff registration?

A. COMMIT immediately and ignore the broken store assignment.  
B. ROLLBACK TO the savepoint, assign an existing store, then COMMIT.  
C. Issue a full ROLLBACK and then COMMIT the original staff insertion.  
D. Repeat the store UPDATE immediately, without clearing the failed state.  

**Correct answer:** B

**Explanation:** This follows the precise aim of the “Flexible Staff Task” exercise: recover from the bad assignment while keeping valid earlier work.

**Source:** `DB5(2).pdf`, PDF p. 33.

### Q053. A developer inserts a valid row, creates a savepoint, inserts another valid row, rolls back to that savepoint, then commits. Which rows from this transaction persist?

A. Both inserted rows.  
B. Neither row, because ROLLBACK TO always aborts the whole transaction.  
C. Only the row inserted after the savepoint.  
D. Only the row inserted before the savepoint.  

**Correct answer:** D

**Explanation:** ROLLBACK TO removes work following its marker even if that later work had no SQL error.

**Source:** `DB5(2).pdf`, PDF p. 32.

### Q054. An inventory transaction performs UPDATE inventory and INSERT orders in one BEGIN...COMMIT block. The INSERT violates a constraint and no savepoint is present. What is the correct interpretation?

A. The inventory decrease must remain while the order insert fails.  
B. The constraint violation automatically converts the transaction to autocommit.  
C. COMMIT preserves all statements that ran before the failed INSERT.  
D. The transaction cannot commit a partial inventory decrease.  

**Correct answer:** D

**Explanation:** The transaction boundary groups related inventory and order effects, so a failure invalidates the unit of work.

**Source:** `DB5(2).pdf`, PDF p. 8, 11, 15.

### Q055. After the failed rental-refund lab has ended, which short SQL statement directly checks whether rental_id = 2 kept its earlier return_date?

A. SELECT return_date FROM payment WHERE rental_id = 2;  
B. UPDATE rental SET return_date = NOW() WHERE rental_id = 2;  
C. SELECT return_date FROM rental WHERE rental_id = 2;  
D. SELECT return_date FROM rental WHERE customer_id = 2;  

**Correct answer:** C

**Explanation:** The lab asks students to inspect the original rental record after rollback. The SELECT checks the intended row and column without modifying it.

**Source:** `DB5(2).pdf`, PDF p. 31.

### Q056. A long transaction contains essential customer creation and a non-critical promotional offer operation that might fail. Which design most directly supports the lecture’s intended behavior?

A. Commit the customer first and treat it as part of the same atomic transaction as the offer.  
B. Place the savepoint before essential customer creation and roll back to it on offer failure.  
C. Execute customer creation and offer insertion as independent autocommit statements.  
D. Create a savepoint after the essential step and roll back to it if the optional step fails.  

**Correct answer:** D

**Explanation:** The lecture’s savepoint use case separates work that must be preserved from optional work that can be undone without aborting the whole transaction.

**Source:** `DB5(2).pdf`, PDF p. 32-33.
