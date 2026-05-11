# GitHub Copilot Lab – Omegapoint

[English version](README.en.md)

En praktisk lab för att lära sig använda GitHub Copilot effektivt i enlighet med Omegapoints säkerhetsprinciper och riktlinjer.

Labben innehåller en uppsättning instruktioner och krav som hjälper dig att använda Copilot för att generera kod,
skriva kommentarer och utföra kodgranskningar på ett säkert och produktivt sätt.

Instruktionerna är skrivna på engelska och uppdelade i steg under `Instructions/Labs`.
Dokumentation om API:et och kodstrukturen finns i README.md i `application`-mappen.

## Förkunskaper

- En GitHub Copilot Pro-licens
- Grundläggande kunskaper i JavaScript/TypeScript och Node.js
- En IDE som stöder GitHub Copilot (t.ex. Visual Studio Code eller IntelliJ)
- En API-klient för att testa REST-endpoints (t.ex. Postman, Bruno eller `curl`)

## Labbens struktur

| Lab | Ämne | Uppskattad tid |
| --- | --- | --- |
| 1 | [Översikt och installation](Instructions/Labs/Lab-1-Getting-Started.md) | 15 min |
| 2 | [Utforska kodbasen](Instructions/Labs/Lab-2-Understanding-Project.md) | 30 min |
| 3 | [Kodkomplettering och Edit-läge](Instructions/Labs/Lab-3-Code-Editing.md) | 30 min |
| 4 | [Agent-läge](Instructions/Labs/Lab-4-Agent-Mode.md) | 45 min |
| 5 | [Anpassa Copilot](Instructions/Labs/Lab-5-Customizing-Copilot.md) | 30 min |
| 6 | [Agent-läge med Secure by Design](Instructions/Labs/Lab-6-Agent-Mode-SBD.md) | 45 min |
| Valfri | [Agentic Coding](Instructions/Labs/Lab-Optional-Agentic-Coding.md) | 45 min |

## Labbens syfte

Syftet med labben är att ge dig praktisk erfarenhet av att använda GitHub Copilot på ett sätt som är i linje med Omegapoints säkerhetsprinciper, samt att förbättra din förmåga att skriva högkvalitativ kod och tester med hjälp av AI-assistans.

## Kom igång

```bash
# Klona ditt repository och starta applikationen
cd application
npm install
npm run dev
```

Mer information finns i [Lab 1 – Översikt och installation](Instructions/Labs/Lab-1-Getting-Started.md).
