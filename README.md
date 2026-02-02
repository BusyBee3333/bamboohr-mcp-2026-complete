> **🚀 Don't want to self-host?** [Join the waitlist for our fully managed solution →](https://mcpengage.com/bamboohr)
> 
> Zero setup. Zero maintenance. Just connect and automate.

---

# 🚀 BambooHR MCP Server — 2026 Complete Version

## 💡 What This Unlocks

**This MCP server gives AI direct access to your entire BambooHR workspace.** Instead of clicking through interfaces, you just *tell* it what you need.

### 🎯 HR Power Moves with BambooHR

The AI can directly control your BambooHR account with natural language:

1. **Onboarding Automation** — "Pull all new hires from last month and generate personalized welcome emails with their start date, department, and manager info"

2. **Time-Off Intelligence** — "Show me all pending PTO requests for the engineering team this quarter, flag conflicts, and suggest optimal approval schedules"

3. **Performance Review Prep** — "For employee #4523, get their goals, recent performance notes, and time-off history — create a comprehensive review brief"

4. **Directory Lookups** — "Find all employees in the Seattle office hired in the last 6 months with 'engineer' in their title"

5. **Compliance Reporting** — "Export complete employee records for everyone in California with I-9 documents, filter by hire date, and format for audit"

### 🔗 The Real Power: Combining Tools

AI can chain multiple BambooHR operations together:

- Query employee directory → Filter by department → Generate org charts
- Check time-off balances → Identify burnout risk → Schedule 1-on-1s
- Pull goals data → Match with performance notes → Create review summaries

## 📦 What's Inside

**7 API tools** covering core BambooHR HR operations:

- `list_employees` — Get all employees with directory info
- `get_employee` — Detailed employee record with custom fields
- `list_time_off_requests` — PTO/leave requests with status filtering
- `request_time_off` — Submit time-off requests
- `list_goals` — Employee goals and performance tracking
- `get_directory` — Full company directory with contact info
- `list_files` — Employee documents and attachments

All with proper error handling, automatic authentication, and TypeScript types.

## 🚀 Quick Start

### Option 1: Claude Desktop (Local)

1. **Clone and build:**
   ```bash
   git clone https://github.com/BusyBee3333/BambooHR-MCP-2026-Complete.git
   cd bamboohr-mcp-2026-complete
   npm install
   npm run build
   ```

2. **Get your BambooHR API credentials:**
   - Log into your BambooHR account
   - Go to Account > API Keys
   - Generate a new API key
   - Note your company subdomain (e.g., `yourcompany` from `yourcompany.bamboohr.com`)

3. **Configure Claude Desktop:**
   
   On macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   
   On Windows: `%APPDATA%\Claude\claude_desktop_config.json`

   ```json
   {
     "mcpServers": {
       "bamboohr": {
         "command": "node",
         "args": ["/ABSOLUTE/PATH/TO/bamboohr-mcp-2026-complete/dist/index.js"],
         "env": {
           "BAMBOOHR_API_KEY": "your-api-key-here",
           "BAMBOOHR_COMPANY_DOMAIN": "yourcompany"
         }
       }
     }
   }
   ```

4. **Restart Claude Desktop**

### Option 2: Deploy to Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/bamboohr-mcp)

1. Click the button above
2. Set `BAMBOOHR_API_KEY` and `BAMBOOHR_COMPANY_DOMAIN` in Railway dashboard
3. Use the Railway URL as your MCP server endpoint

### Option 3: Docker

```bash
docker build -t bamboohr-mcp .
docker run -p 3000:3000 \
  -e BAMBOOHR_API_KEY=your-key \
  -e BAMBOOHR_COMPANY_DOMAIN=yourcompany \
  bamboohr-mcp
```

## 🔐 Authentication

BambooHR uses **API Key authentication** (Basic Auth with API key as username).

**Get your API credentials:**
1. BambooHR account → Account → API Keys
2. Generate new API key
3. Copy your company subdomain (from `yourcompany.bamboohr.com`)

**API Documentation:** https://documentation.bamboohr.com/reference

The MCP server handles authentication automatically via Basic Auth headers.

## 🎯 Example Prompts

Once connected to Claude, you can use natural language. HR-specific examples:

- *"Show me all employees in the engineering department hired in 2025"*
- *"Get pending time-off requests for next month"*
- *"Pull employee #1234's contact info, job title, and manager"*
- *"List all employees with 'Director' in their title"*
- *"Check time-off balances for the marketing team"*
- *"Show me Sarah Chen's performance goals and recent documents"*
- *"Generate a directory report of the SF office sorted by hire date"*

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn
- BambooHR account with API access

### Setup

```bash
git clone https://github.com/BusyBee3333/BambooHR-MCP-2026-Complete.git
cd bamboohr-mcp-2026-complete
npm install
cp .env.example .env
# Edit .env with your BambooHR credentials
npm run build
npm start
```

### Testing

```bash
npm test                  # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

## 🐛 Troubleshooting

### "Authentication failed"
- Verify your API key is correct (regenerate if needed)
- Check that your company domain is just the subdomain (not the full URL)
- Ensure your API key has the necessary permissions

### "Tools not appearing in Claude"
- Restart Claude Desktop after updating config
- Check that the path in `claude_desktop_config.json` is absolute
- Verify the build completed successfully (`dist/index.js` exists)

### "Company domain error"
- Use only the subdomain: `yourcompany` NOT `yourcompany.bamboohr.com`
- Check for typos in your company domain

## 📖 Resources

- [BambooHR API Documentation](https://documentation.bamboohr.com/reference)
- [MCP Protocol Specification](https://modelcontextprotocol.io/)
- [Claude Desktop Documentation](https://claude.ai/desktop)

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-tool`)
3. Commit your changes (`git commit -m 'Add amazing tool'`)
4. Push to the branch (`git push origin feature/amazing-tool`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

## 🙏 Credits

Built by [MCPEngage](https://mcpengage.com) — AI infrastructure for business software.

Want more MCP servers? Check out our [full catalog](https://mcpengage.com) covering 30+ business platforms.

---

**Questions?** Open an issue or join our [Discord community](https://discord.gg/mcpengage).
