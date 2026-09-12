# Code review

This section preserves the audit logic that belongs to the code review skill without depending on that skill at runtime.

## Review axis 1: Standards

Review the change against the repo's documented coding standards and against a baseline smell checklist. The goal is to decide whether the diff follows the project's rules and whether the implementation shows avoidable maintenance smell.

### Baseline smells to look for
- Mysterious Name
- Duplicated Code
- Feature Envy
- Data Clumps
- Primitive Obsession
- Repeated Switches
- Shotgun Surgery
- Divergent Change
- Speculative Generality
- Message Chains
- Middle Man
- Refused Bequest

### Rule
- A documented repo standard wins over the smell baseline.
- Baseline smells are judgement calls, not absolute violations.
- Skip anything tooling already enforces.

## Review axis 2: Spec

Check whether the diff faithfully implements the originating issue or spec.

Look for:
- requirements missing or partially implemented
- scope creep that was not asked for
- behaviour in the diff that contradicts the spec
- work that looks plausible but is not actually what the requirement asked for

## Output framing

Report the two axes separately, not as one merged list, because a change can pass one axis and fail the other.

- Standards pass, Spec fails: the code is clean but wrong.
- Spec passes, Standards fails: the code matches the request but violates the repo conventions.

## Summary rule

End with a one-line summary that says the total findings per axis and the worst issue within each axis. Do not rank one axis over the other.
