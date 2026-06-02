# Security Model

## Authentication
- JWT-based auth with refresh tokens
- OAuth 2.0 for Google, GitHub, etc.
- 2FA support (TOTP)
- Session management with device tracking

## Authorization (RBAC)
Roles: owner, admin, developer, designer, researcher, user, viewer

Each role has granular permissions (chat.*, project.*, document.*, terminal.*, etc.)

## API Security
- All API keys encrypted at rest
- Rate limiting per user/IP
- Request validation via Pydantic
- CORS restricted to allowed origins

## Action Approval
Dangerous actions always require user confirmation:
- File deletion
- Email sending
- Payment execution
- Subscription changes
- Package installation
- Destructive terminal commands
- Mass note modification
- Camera/microphone/screen access

## Permission Levels (Computer Control)
- Level 0: No control
- Level 1: Read screen only
- Level 2: Read authorized files
- Level 3: Execute safe commands
- Level 4: Mouse/keyboard with confirmation
- Level 5: Admin mode (full audit)

## Data Protection
- Passwords hashed with bcrypt
- API keys stored encrypted
- Database connection encrypted
- Audit logs for all sensitive operations
- Session revocation on suspicious activity
