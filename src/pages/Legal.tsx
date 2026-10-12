import React from "react";
import { Reveal, Kicker, Barcode } from "../components/ui";
import { Page } from "../components/Header";
import { SITE } from "../config/site";

function LegalShell({
  kicker,
  title,
  updated,
  children,
  onNavigate,
}: {
  kicker: string;
  title: string;
  updated: string;
  children: React.ReactNode;
  onNavigate: (p: Page) => void;
}) {
  return (
    <section className="grid-bg relative">
      <div className="glow-aura absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-14 sm:py-20">
        <Reveal variant="pulse">
          <Kicker>{kicker}</Kicker>
        </Reveal>
        <Reveal variant="feed" delay={120}>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl tracking-tight leading-[1.02] font-semibold text-fg">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={220}>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-mut">Last updated: {updated}</p>
        </Reveal>
        <div className="mt-10 space-y-5">{children}</div>
        <Reveal delay={100}>
          <div className="mt-16 border-t border-line pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <Barcode className="!text-line-2" label={`LEGAL SHEET · ${SITE.name.toUpperCase()}`} />
            <button
              onClick={() => onNavigate("home")}
              className="underline-slide font-display text-[11px] font-semibold uppercase tracking-[0.14em] cursor-pointer text-mut hover:text-lime"
            >
              &larr; Back to Home
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Article({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <article className="border border-line bg-surface/70 hud-corners">
        <h2 className="flex items-baseline gap-4 border-b border-line bg-surface-2/70 px-5 sm:px-7 py-3.5">
          <span className="font-mono text-[11px] font-bold text-lime">{n}</span>
          <span className="font-display text-[14px] font-semibold uppercase tracking-[0.1em] text-fg">{title}</span>
        </h2>
        <div className="px-5 sm:px-7 py-5 space-y-3.5 text-[13.5px] leading-relaxed text-mut">{children}</div>
      </article>
    </Reveal>
  );
}

export function Terms({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <LegalShell kicker="Legal Documentation" title="Terms & Conditions" updated="January 2026" onNavigate={onNavigate}>
      {/* Support / Contact details block */}
      <Article n="00" title="Customer Service & Contact Details">
        <div className="grid sm:grid-cols-2 gap-4 not-prose">
          <div className="border border-line bg-bg-2 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-lime">Toll-Free Support</p>
            <p className="mt-1 text-sm font-semibold text-fg">
              <a href={SITE.phoneHref} className="hover:text-lime transition-colors">
                {SITE.phone}
              </a>
            </p>
            <p className="mt-0.5 text-xs text-mut">Open 24/7 for order and vehicle lookup inquiries</p>
          </div>
          <div className="border border-line bg-bg-2 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">Direct Email</p>
            <p className="mt-1 text-sm font-semibold text-fg">
              <a href={SITE.emailHref} className="hover:text-cyan transition-colors">
                {SITE.email}
              </a>
            </p>
            <p className="mt-0.5 text-xs text-mut">Direct correspondence &amp; customer care</p>
          </div>
        </div>
      </Article>

      <Article n="01" title="Agreement">
        <p>
          Welcome to {SITE.name}! The representations of our services and products available through this website do not constitute a binding offer. By clicking &ldquo;SEARCH&rdquo; or &ldquo;SHOW ME MY REPORT&rdquo; or &ldquo;YES, CONTINUE TO MY REPORT,&rdquo; You agree to be bound to these Terms of Use (the &ldquo;Agreement&rdquo;), constituting a legally binding agreement by and between {SITE.name}, (hereinafter, &ldquo;{SITE.name}&rdquo; or &ldquo;We&rdquo; or &ldquo;Our&rdquo;) and you (in either case, &ldquo;You&rdquo; or &ldquo;Your&rdquo;) concerning Your use of {SITE.name} website (the &ldquo;Website&rdquo;) and the services available through the Website (the &ldquo;Services&rdquo;). We encourage you to print the Agreement or copy it to your computer&rsquo;s hard drive for your reference. With a customer&rsquo;s order, the customer submits a binding offer for the formation of a contract. Following the order, {SITE.name} will process the customer&rsquo;s order and send a confirmation email to acknowledge the receipt of the customer&rsquo;s order. This acknowledgement of receipt does not constitute an acceptance of the order. The order is accepted with the provision of the requested goods or services. By proceeding to place an order, you are agreeing that you shall indemnify, defend and hold harmless {SITE.name}, its officers, directors, employees and agents, and the entities that have contributed information to or provided services for our Website and/or Products against any and all direct or indirect losses, claims, demands, expenses (including attorneys&rsquo; fees and cost) or liabilities of whatever nature or kind arising out of your use of our Website and/or Products and your use or distribution of any information obtained there. You will promptly notify us of any such claim. If you do not understand this agreement, or do not agree to be bound by it or the privacy policy, you may not access or use the website or services and you must immediately leave the website and cease using the services.
        </p>
      </Article>

      <Article n="02" title="Privacy Policy">
        <p>
          {SITE.name} collects identifying and billing information including name, address, credit card information and e-mail address when consumers register for our services. Any personally identifiable information you provide to us including your email and phone number may be used to notify you of new products, product changes or offer discounts up to 50%. By providing your information, you may also receive electronic communications, including SMS communications (for informational purposes only) or email (for all permissible commercial purposes) from {SITE.name} partner firms which may include third party marketing companies, affiliates, advertising agencies, and data aggregation companies regarding our or their services. You may opt-out of receiving electronic communications at any time by following the unsubscribe instructions contained in each communication, but you must contact third-parties directly to do so.
        </p>
      </Article>

      <Article n="03" title="Changes to Agreement and Privacy Policy">
        <p>
          Internet technology and the applicable laws, rules, and regulations change frequently. Accordingly, {SITE.name} reserves the right to change this agreement and its privacy policy at any time upon notice to you, to be given by the posting of a new version or a change notice on the website. It is your responsibility to review this agreement and the privacy policy periodically. If at any time you find either unacceptable, you must immediately leave the website and cease using the services. Unless {SITE.name} obtains your express consent, any revised privacy policy will apply only to information collected by {SITE.name} after such time as the revised Privacy Policy takes effect, and not to information collected under any earlier Privacy Policies.
        </p>
      </Article>

      <Article n="04" title="Eligibility">
        <p>
          By using the website or services, you represent and warrant that you are at least 18 years old and are otherwise legally qualified to enter into and form contracts under applicable law. Any individual using the Website or Services on behalf of a company further represents and warrants that they are authorized to act and enter into contracts on behalf of that company. This Agreement is void where prohibited.
        </p>
      </Article>

      <Article n="05" title={`${SITE.name} Role`}>
        <p>
          Without limitation, you agree that {SITE.name} is merely a technology solution that serves as a third-party platform and you use the Website and Services at Your own risk, without limitation and pursuant to Section: ASSUMPTION OF RISK; RELEASE. {SITE.name} role is limited because {SITE.name} is not directly involved in creating or storing the underlying information in our reports. {SITE.name} does not necessarily prescreen the content and/or information provided to users. {SITE.name} does not take or transfer ownership of items or liability attaching thereto. For additional information, please carefully review Section: DISCLAIMERS; LIMITATION OF LIABILITY.
        </p>
      </Article>

      <Article n="06" title="License">
        <p>
          Unless otherwise stated, {SITE.name} owns the intellectual property rights for all material on {SITE.url}/. All intellectual property rights are reserved. You may view and/or print pages from {SITE.name} for your own personal use subject to restrictions set in these terms and conditions. You must not:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-fg/80">
          <li>Republish material from {SITE.url}/</li>
          <li>Sell, rent or sub-license material from {SITE.url}/</li>
          <li>Reproduce, duplicate or copy material from {SITE.url}/</li>
          <li>Redistribute content from {SITE.name} (unless content is specifically made for redistribution).</li>
        </ul>
      </Article>

      <Article n="07" title="No Reliance on Third Party Content">
        <p>
          The information on the Website is provided for information purposes only. The Website and Services are provided only as a technology solution and shall not be liable for any delay or failure to make available the Report. {SITE.name} does not:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-fg/80">
          <li>Guarantee the accuracy, completeness, or usefulness of any third-party information accessible on or through the Website;</li>
          <li>Adopt, endorse, or accept responsibility for the accuracy or reliability of any opinion, advice or statement made by a third party by means of the Website and Services.</li>
        </ul>
        <p>
          Under no circumstances will {SITE.name} be responsible for any loss or damage resulting from your reliance on information or other content posted on the Website or transmitted to or by any third party. {SITE.name} provides the reports to you &ldquo;as is&rdquo;, and expressly disclaims all warranties, express or implied, including any implied warranties of merchantability or fitness for a particular purpose regarding the reports.
        </p>
      </Article>

      <Article n="08" title="Assumption of Risk; Release">
        <p>
          You knowingly and freely assume all risk when using the website and services. You, on behalf of yourself, your personal representatives, and your heirs, hereby voluntarily agree to release, waive, discharge, hold harmless, defend, and indemnify {SITE.name} and its stockholders, officers, directors, employees, agents, affiliates, consultants, representatives, sublicenses, successors, and assigns (collectively, the &ldquo;{SITE.name} parties&rdquo;) from any and all claims, actions, or losses for bodily injury, property damage, wrongful death, emotional distress, loss of privacy, or other damages or harm, whether to you or to third parties, that may result from your use of the website and services.
        </p>
      </Article>

      <Article n="09" title="User Information; Password Protection">
        <p>
          To access and/or use the Website and use the Services, You may be asked to provide certain registration details or other information. You represent and warrant that all user information you provide in connection with your use of the Website and Services will be current, complete, and accurate, and that you will update that information as necessary to maintain its completeness and accuracy. If {SITE.name} believes in its sole discretion that the information you provide is not current, complete, or accurate, {SITE.name} has the right to refuse your access to the Website and Services and/or to terminate or suspend your access at any time. You represent and warrant that you will not create a fake account. You are entirely responsible for maintaining the confidentiality of your password and notify us immediately of any unauthorized use.
        </p>
      </Article>

      <Article n="10" title={`Reserved Rights for ${SITE.name} Fees & Refund Policy`}>
        <p>
          You acknowledge and agree that {SITE.name} reserves the right to charge for access to the Website and use of the Services, in accordance with the {SITE.name} Fees clearly disclosed throughout the Website. By using the Website and/or Services, You authorize {SITE.name}, and/or its payment processor, to charge {SITE.name} fees to the credit card, debit card, or other payment method you provide. {SITE.name} prohibits resale of packages or sharing accounts with other users.
        </p>
        <div className="border border-line bg-bg-2 p-4 mt-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-lime">Offer Details &amp; Refund Policy</p>
          <p className="mt-2 text-sm text-fg/90 leading-relaxed">
            If you are unhappy with your search results and would like a refund, please contact our customer support: they will be happy to assist you immediately with our refund policy. You can cancel or request support anytime by calling {SITE.phone} or visiting our contact page.
          </p>
        </div>
      </Article>

      <Article n="11" title="Third-Party Websites">
        <p>
          The Website is linked with the websites of third parties (&ldquo;Third-Party Websites&rdquo;). {SITE.name} does not have control over the content and performance of Third-Party Websites and has not reviewed all material made available on or through them. Accordingly, {SITE.name} does not represent, warrant, or endorse any third-party website, or the accuracy, currency, content, fitness, lawfulness, or quality of the information, goods, or services available through them.
        </p>
      </Article>

      <Article n="12" title="Prohibited Uses">
        <p>
          {SITE.name} imposes certain restrictions on your use of the Website and Services. You represent and warrant that you will not: (a) harass or contact any person who has requested not to be contacted; (b) provide false or misleading information; (c) impersonate any person or entity; (d) harvest or collect user information; (e) access content or data not intended for you; (f) attempt to probe, scan, or test the vulnerability of the Services or breach security; (g) interfere with service to any user, host, or network; or (h) attempt to reverse-engineer, decompile, or disassemble any source code.
        </p>
      </Article>

      <Article n="13" title="Intellectual Property & DMCA Policy">
        <p>
          All content and materials available through the Website, including logos, designs, text, graphics, and arrangement, are owned by {SITE.name} or its licensors. If you believe content located on or linked to by the Website violates your copyright, you may notify us with an Infringement Notice containing description, location, contact details, and statement under penalty of perjury sent to {SITE.email}.
        </p>
      </Article>

      <Article n="14" title="Disclaimers; Limitation of Liability">
        <p>
          This site is provided by {SITE.name} on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. {SITE.name} does not specifically warrant or guarantee the completeness or turnaround time of search reports. The liability of {SITE.name} and its licensors and suppliers is limited to the maximum extent permitted by law, and in no event shall liability exceed the amount paid for the applicable service.
        </p>
      </Article>

      <Article n="15" title="Representations, Warranties & Indemnity">
        <p>
          You represent and warrant that your use of the Website and Services will comply with this Agreement and all applicable laws. You agree to defend, indemnify, and hold harmless {SITE.name} and its affiliates, officers, and employees from and against any claims, actions, or proceedings arising out of your breach of this Agreement, access to the Services, or violation of third-party rights.
        </p>
      </Article>

      <Article n="16" title="Governing Law, Arbitration & Dispute Resolution">
        <p>
          Any cause of action arising out of or relating to the Website or Services must be instituted within one (1) year after the cause of action arose. If any dispute cannot be resolved through informal negotiations, it shall be resolved by binding arbitration conducted under the Commercial Arbitration Rules of the American Arbitration Association (&ldquo;AAA&rdquo;). Both parties agree that any arbitration shall be conducted on an individual basis and not as a class action.
        </p>
      </Article>

      <Article n="17" title="Termination & Survival">
        <p>
          {SITE.name} reserves the right in its sole discretion to terminate access to the Website and Services at any time. Any termination automatically revokes all licenses granted herein. Sections regarding intellectual property, warranties, limitations of liability, indemnity, and dispute resolution shall survive termination.
        </p>
      </Article>

      <Article n="18" title="General Terms & Severability">
        <p>
          This Agreement constitutes the entire agreement between {SITE.name} and You concerning your use of the Website and Services. Should any part of this Agreement be declared invalid or unenforceable by a court of competent jurisdiction, the remaining portions shall remain in full force and effect. Questions regarding these Terms can be directed to {SITE.email} or by calling {SITE.phone}.
        </p>
      </Article>
    </LegalShell>
  );
}

export function Privacy({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <LegalShell kicker="Privacy & Data Protection" title="Privacy Policy" updated="January 2026" onNavigate={onNavigate}>
      <Article n="01" title="Introduction & Policy Overview">
        <p>
          Thank you for visiting the {SITE.name} website located at{" "}
          <a href={`${SITE.url}/`} className="text-lime underline">
            {SITE.url}/
          </a>
          . This Privacy Policy outlines our practices regarding information collection, usage, and protection when you visit our website, submit VIN queries, or purchase window stickers and vehicle intelligence reports. We believe in permission-based transparency and do not sell personal information to unauthorized third parties without permission.
        </p>
      </Article>

      <Article n="02" title="Your IP Address & Technical Diagnostics">
        <p>
          Each time you visit the Site, our web server automatically recognizes your IP address and referring web page. Your IP address is used to assist diagnostics, maintain server availability, administer the Site, and verify high-performance delivery of window sticker and build sheet assets.
        </p>
      </Article>

      <Article n="03" title="Cookies & Action Tags">
        <p>
          We use session cookies and local storage tokens to recognize returning users, preserve selected report and sticker configurations, pre-populate active inquiries upon request, and optimize interface responsiveness. Action tags and analytics indicators allow us to count page visits and gauge feature usage without recording personal sensitive financial credentials.
        </p>
      </Article>

      <Article n="04" title="Personal Information We Collect">
        <p>
          When you register an account, lookup a vehicle, or purchase report packages, we may collect personal details such as:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-fg/80">
          <li>Your full name and primary email address for report dispatch,</li>
          <li>Optional telephone number for support inquiries,</li>
          <li>Vehicle Identification Numbers (VIN) and vehicle registration parameters queried,</li>
          <li>Billing and transaction history associated with purchased credit bundles.</li>
        </ul>
      </Article>

      <Article n="05" title="Use of Information & Order Fulfillment">
        <p>
          Information collected is applied directly to generate and deliver official Monroney window stickers, decode RPO and option packages, manage account credit balances, send receipt notices, and deliver requested customer care support. We may occasionally send account updates or promotional opportunities with easy one-click unsubscribe links.
        </p>
      </Article>

      <Article n="06" title="Data Security & SSL Encryption">
        <p>
          We employ industry-standard SSL encryption and strict access controls across all user data and transaction interfaces. Sensitive billing data is processed via compliant secure payment gateways; full credit card numbers are never stored in plain text on our web servers. Access to internal databases is restricted to authorized personnel.
        </p>
      </Article>

      <Article n="07" title="Minors & Age Requirement">
        <p>
          Our services are intended for individuals 18 years of age or older. We do not knowingly solicit or collect personal information from individuals under the age of 18.
        </p>
      </Article>

      <Article n="08" title="Opting Out & Account Removal">
        <p>
          At your request, we will remove your personal identifying information from active marketing distributions. You can manage your preferences or request account deletion anytime by contacting our support desk at{" "}
          <a href={SITE.emailHref} className="text-lime underline">
            {SITE.email}
          </a>{" "}
          or calling toll-free at{" "}
          <a href={SITE.phoneHref} className="text-lime underline">
            {SITE.phone}
          </a>
          .
        </p>
      </Article>
    </LegalShell>
  );
}
