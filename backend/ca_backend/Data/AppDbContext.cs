using ca_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace ca_backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    // DbSets
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<PasswordChange> PasswordChanges { get; set; } = null!;
    public DbSet<Client> Clients { get; set; } = null!;
    public DbSet<ComplianceTask> ComplianceTasks { get; set; } = null!;
    public DbSet<ClientDocument> ClientDocuments { get; set; } = null!;
    public DbSet<DeletedClient> DeletedClients { get; set; } = null!;
    public DbSet<Invoice> Invoices { get; set; } = null!;
    public DbSet<FilingTracker> FilingTrackers { get; set; } = null!;
    public DbSet<Staff> Staff { get; set; }
    public DbSet<TimeTracker> TimeTracker { get; set; }

    public DbSet<Notification> Notifications { get; set; } = null!;
    public DbSet<Email> Emails { get; set; } = null!;

    public DbSet<AppTask> Tasks { get; set; } = null!;

    public DbSet<GeneralSetting> GeneralSettings { get; set; } = null!;

    public DbSet<ContactSetting> ContactSettings { get; set; } = null!;

    public DbSet<NotificationSetting> NotificationSettings { get; set; } = null!;

    // Inside your AppDbContext class
    public DbSet<BrandingSetting> BrandingSettings { get; set; } = null!;
    // Inside AppDbContext class – add this line with your other DbSets
    public DbSet<SecuritySetting> SecuritySettings { get; set; } = null!;
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // USER TABLE
        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("users");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.FirstName).HasColumnName("first_name");
            entity.Property(e => e.LastName).HasColumnName("last_name");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.MobileNumber).HasColumnName("mobile_number");
            entity.Property(e => e.Password).HasColumnName("password");
            entity.Property(e => e.Role).HasColumnName("role");
            entity.HasIndex(e => e.Email).IsUnique();
            entity.HasIndex(e => e.MobileNumber).IsUnique();
        });

        // PASSWORDCHANGE TABLE
        modelBuilder.Entity<PasswordChange>(entity =>
        {
            entity.ToTable("passwordchanges");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.IsChanged).HasColumnName("is_changed").HasDefaultValue(false);
            entity.HasIndex(e => e.Email).IsUnique();
        });

        // CLIENT TABLE
        modelBuilder.Entity<Client>(entity =>
        {
            entity.ToTable("clients");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id).HasColumnName("client_id");

            entity.Property(e => e.ClientName).HasColumnName("client_name").IsRequired();

            entity.Property(e => e.ClientType).HasColumnName("client_type").IsRequired();

            entity.Property(e => e.PanNumber).HasColumnName("pan_number");
            entity.Property(e => e.GstNumber).HasColumnName("gst_number");

            entity.Property(e => e.Contact).HasColumnName("contact").IsRequired();

            entity.Property(e => e.Services).HasColumnName("services").IsRequired();

            entity.Property(e => e.Status).HasColumnName("status")
                  .IsRequired()
                  .HasDefaultValue("Active");

            entity.Property(e => e.LastActivity).HasColumnName("last_activity");

            entity.Property(e => e.CreatedAt).HasColumnName("created_at")
                  .IsRequired()
                  .HasConversion(v => v, v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

            entity.Property(e => e.UpdatedAt).HasColumnName("updated_at")
                  .IsRequired()
                  .HasConversion(v => v, v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

            // NEW – EMAIL FIELD MAPPING
            entity.Property(e => e.Email).HasColumnName("email");

            // Optional: Make email unique (if you want strict uniqueness)
            // entity.HasIndex(e => e.Email).IsUnique();

            entity.ToTable(t => t.HasCheckConstraint(
                "clients_client_type_check",
                "lower(client_type) IN ('company', 'individual', 'partnership')"));
        });

        // COMPLIANCE CALENDAR TABLE
        modelBuilder.Entity<ComplianceTask>(entity =>
        {
            entity.ToTable("compliance_calender");
            entity.HasKey(e => e.ComplianceId);
            entity.Property(e => e.ComplianceId).HasColumnName("compliance_id");
            entity.Property(e => e.CompanyName).HasColumnName("company_name").IsRequired();
            entity.Property(e => e.Task).HasColumnName("task").IsRequired();
            entity.Property(e => e.TaskDescription).HasColumnName("task_description");
            entity.Property(e => e.Deadline).HasColumnName("deadline").IsRequired();
            entity.Property(e => e.Status).HasColumnName("status").HasDefaultValue("Pending");
            entity.Property(e => e.AssignedToName).HasColumnName("assigned_to_name");
            entity.Property(e => e.AssignedToEmail).HasColumnName("assigned_to_email");
            entity.ToTable(t => t.HasCheckConstraint(
                "compliance_task_check",
                "task IN ('GST', 'TDS', 'ITR', 'ROC', 'Audit')"));
        });

        // CLIENT DOCUMENTS TABLE
        modelBuilder.Entity<ClientDocument>(entity =>
        {
            entity.ToTable("client_documents");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id)
                .HasColumnName("id");

            entity.Property(e => e.Document)
                .HasColumnName("document")
                .IsRequired();

            entity.Property(e => e.ClientName)
                .HasColumnName("client_name")
                .IsRequired();

            entity.Property(e => e.Category)
                .HasColumnName("category")
                .IsRequired();

            entity.Property(e => e.Status)
                .HasColumnName("status")
                .IsRequired();

            entity.Property(e => e.UploadDate)
                .HasColumnName("upload_date")
                .HasDefaultValueSql("NOW()");

            
            entity.Property(e => e.OriginalFileName)
                .HasColumnName("original_filename");

            entity.ToTable(t => t.HasCheckConstraint(
                "category_check",
                "category IN ('GST Documents','Identity Documents','Financial Documents','Tax Returns','Invoices')"
            ));

            entity.ToTable(t => t.HasCheckConstraint(
                "status_check",
                "status IN ('verified','processing','rejected')"
            ));
        });


        // DELETED CLIENTS TABLE
        // DELETED_CLIENT TABLE MAPPING
        modelBuilder.Entity<DeletedClient>(entity =>
        {
            entity.ToTable("deleted_clients");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ClientName).HasColumnName("client_name");
            entity.Property(e => e.ClientType).HasColumnName("client_type");
            entity.Property(e => e.PanNumber).HasColumnName("pan_number");
            entity.Property(e => e.GstNumber).HasColumnName("gst_number");
            entity.Property(e => e.Contact).HasColumnName("contact");
            entity.Property(e => e.Services).HasColumnName("services");
            entity.Property(e => e.LastActivity).HasColumnName("last_activity");
            entity.Property(e => e.CreatedAt).HasColumnName("created_at")
                  .HasConversion(v => v, v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
            entity.Property(e => e.UpdatedAt).HasColumnName("updated_at")
                  .HasConversion(v => v, v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
            entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");

            // FIXED – Explicitly map to lowercase 'email'
            entity.Property(e => e.Email).HasColumnName("email");
        });

        // INVOICES TABLE
        modelBuilder.Entity<Invoice>(entity =>
        {
            entity.ToTable("invoices");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.InvoiceNumber).HasColumnName("invoicenumber").IsRequired();
            entity.Property(e => e.InvoiceDate).HasColumnName("invoicedate").HasDefaultValueSql("CURRENT_DATE");
            entity.Property(e => e.DueDate).HasColumnName("duedate").IsRequired();
            entity.Property(e => e.InvoiceItems).HasColumnName("invoiceitems").IsRequired();
            entity.Property(e => e.ClientName).HasColumnName("client_name").IsRequired();
            entity.Property(e => e.Status).HasColumnName("status").IsRequired().HasDefaultValue("Pending");
            entity.HasIndex(e => e.InvoiceNumber).IsUnique();
            entity.ToTable(t => t.HasCheckConstraint(
                "status_check",
                "status IN ('Completed', 'Overdue', 'Pending')"));
        });

        // FILING TRACKER TABLE
        // Inside your AppDbContext.OnModelCreating()
        modelBuilder.Entity<FilingTracker>(entity =>
        {
            entity.ToTable("filing_tracker");

            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();

            entity.Property(e => e.ClientName).HasColumnName("client_name").IsRequired().HasMaxLength(255);
            entity.Property(e => e.Service).HasColumnName("service").IsRequired().HasMaxLength(255);
            entity.Property(e => e.DueDate).HasColumnName("due_date").IsRequired();

            entity.Property(e => e.Status)
                  .HasColumnName("status")
                  .IsRequired()
                  .HasDefaultValue("Pending")
                  .HasMaxLength(20);

            entity.Property(e => e.AssignedTo)
                  .HasColumnName("assigned_to")
                  .IsRequired()
                  .HasMaxLength(100);

            // These map exactly to your new DB columns
            entity.Property(e => e.AssignedToName)
                  .HasColumnName("assigned_to_name")
                  .IsRequired()
                  .HasMaxLength(150);

            entity.Property(e => e.AssignedToEmail)
                  .HasColumnName("assigned_to_email")
                  .IsRequired()
                  .HasMaxLength(255);

            entity.Property(e => e.Priority)
                  .HasColumnName("priority")
                  .IsRequired()
                  .HasDefaultValue("Medium")
                  .HasMaxLength(10);

            // Check constraints (PostgreSQL)
            entity.ToTable(t => t.HasCheckConstraint("status_check",
                "status IN ('Pending', 'In Progress', 'Completed', 'Overdue')"));

            entity.ToTable(t => t.HasCheckConstraint("priority_check",
                "priority IN ('High', 'Medium', 'Low')"));
        });

        // STAFF TABLE
        modelBuilder.Entity<Staff>(entity =>
        {
            entity.ToTable("staff");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.FullName).HasColumnName("full_name");
            entity.Property(e => e.EmailAddress).HasColumnName("email_address");
            entity.Property(e => e.PhoneNumber).HasColumnName("phone_number");
            entity.Property(e => e.Role).HasColumnName("role");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.JoiningDate).HasColumnName("joining_date");
            entity.Property(e => e.ClientManagement).HasColumnName("client_management");
            entity.Property(e => e.Filing).HasColumnName("filing");
            entity.Property(e => e.Documents).HasColumnName("documents");
            entity.Property(e => e.Billing).HasColumnName("billing");
            entity.Property(e => e.Reports).HasColumnName("reports");
            entity.Property(e => e.FirmSettings).HasColumnName("firm_settings");
            entity.Property(e => e.UserManagement).HasColumnName("user_management");
            entity.Property(e => e.ComplianceCalendar).HasColumnName("compliance_calendar");
            entity.Property(e => e.GenerateInvoice).HasColumnName("generate_invoice");
            entity.Property(e => e.TimeTracking).HasColumnName("time_tracking");
            entity.Property(e => e.TaskManagement).HasColumnName("task_management");
            entity.Property(e => e.Department).HasColumnName("department");
        });

        // TIME TRACKER TABLE
        modelBuilder.Entity<TimeTracker>(entity =>
        {
            entity.ToTable("time_tracker");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.TaskDescription).HasColumnName("task_description");
            entity.Property(e => e.Client).HasColumnName("client");
            entity.Property(e => e.Project).HasColumnName("project");
            entity.Property(e => e.Date).HasColumnName("date");
            entity.Property(e => e.BillingType).HasColumnName("billing_type");
            entity.Property(e => e.Duration).HasColumnName("duration");
        });

        // At the end of OnModelCreating – add this
        modelBuilder.Entity<AppTask>(entity =>
        {
            entity.ToTable("tasks");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id)
                  .HasColumnName("id")
                  .ValueGeneratedOnAdd();

            entity.Property(e => e.TaskName)
                  .HasColumnName("task_name")
                  .IsRequired()
                  .HasMaxLength(500);

            entity.Property(e => e.AssignedTo)
                  .HasColumnName("assigned_to")
                  .IsRequired();

            entity.Property(e => e.AssignedToEmail)
                  .HasColumnName("assigned_to_email");

            entity.Property(e => e.CreatedByEmail)
                  .HasColumnName("created_by_email");

            // NEW – THESE TWO LINES MAKE description AND client SAVE TO DB
            entity.Property(e => e.Description)
                  .HasColumnName("description");

            entity.Property(e => e.Client)
                  .HasColumnName("client");

            entity.Property(e => e.DueDate)
                  .HasColumnName("due_date")
                  .IsRequired();

            entity.Property(e => e.Priority)
                  .HasColumnName("priority")
                  .IsRequired()
                  .HasDefaultValue("Medium");

            entity.Property(e => e.EstimatedHours)
                  .HasColumnName("estimated_hours")
                  .HasColumnType("numeric(5,2)")
                  .HasDefaultValue(0);

            entity.Property(e => e.Status)
                  .HasColumnName("status")
                  .IsRequired()
                  .HasDefaultValue("To Do");

            entity.Property(e => e.CreatedAt)
                  .HasColumnName("created_at")
                  .HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.Property(e => e.UpdatedAt)
                  .HasColumnName("updated_at")
                  .HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        // Inside OnModelCreating – REPLACE your old config with this
        modelBuilder.Entity<GeneralSetting>(entity =>
        {
            entity.ToTable("general_settings");

            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id)
                  .HasColumnName("id")
                  .ValueGeneratedNever(); // We manually set Id = 1

            entity.Property(e => e.FirmName).HasColumnName("firm_name").IsRequired();
            entity.Property(e => e.RegistrationNumber).HasColumnName("registration_number");
            entity.Property(e => e.PANNumber).HasColumnName("pan_number").IsRequired();
            entity.Property(e => e.GSTIN).HasColumnName("gstin");
            entity.Property(e => e.FirmDescription).HasColumnName("firm_description");
            entity.Property(e => e.FinancialYear).HasColumnName("financial_year").IsRequired();
            entity.Property(e => e.Currency).HasColumnName("currency").IsRequired();
            entity.Property(e => e.Timezone).HasColumnName("timezone").IsRequired();
            entity.Property(e => e.WorkingHours).HasColumnName("working_hours").IsRequired();
        });

        modelBuilder.Entity<ContactSetting>(entity =>
        {
            entity.ToTable("contact_settings");

            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id)
                  .HasColumnName("id")
                  .ValueGeneratedNever(); // We set Id = 1 manually

            entity.Property(e => e.StreetAddress).HasColumnName("street_address");
            entity.Property(e => e.City).HasColumnName("city");
            entity.Property(e => e.State).HasColumnName("state");
            entity.Property(e => e.PinCode).HasColumnName("pin_code");

            entity.Property(e => e.PrimaryPhone).HasColumnName("primary_phone");
            entity.Property(e => e.SecondaryPhone).HasColumnName("secondary_phone");

            entity.Property(e => e.PrimaryEmail).HasColumnName("primary_email");
            entity.Property(e => e.SupportEmail).HasColumnName("support_email");

            entity.Property(e => e.Website).HasColumnName("website");
        });

        modelBuilder.Entity<Email>(entity =>
        {
            entity.ToTable("emails");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.FromEmail).HasColumnName("from_email").IsRequired();
            entity.Property(e => e.ToEmail).HasColumnName("to_email").IsRequired();
            entity.Property(e => e.Subject).HasColumnName("subject");
            entity.Property(e => e.Body).HasColumnName("body");
            entity.Property(e => e.SentAt).HasColumnName("sent_at");
            entity.Property(e => e.ReceivedAt).HasColumnName("received_at");
            entity.Property(e => e.IsSent).HasColumnName("is_sent").HasDefaultValue(true);
            entity.Property(e => e.Attachment).HasColumnName("attachment_bytea");
        });
        // Inside OnModelCreating – ADD THIS
        modelBuilder.Entity<BrandingSetting>(entity =>
        {
            entity.ToTable("branding_settings");

            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id)
                  .HasColumnName("id")
                  .ValueGeneratedNever();

            entity.Property(e => e.FirmLogoUrl).HasColumnName("firm_logo_url");
            entity.Property(e => e.PrimaryColor).HasColumnName("primary_color")
                  .HasDefaultValue("#1e40af");
            entity.Property(e => e.SecondaryColor).HasColumnName("secondary_color")
                  .HasDefaultValue("#f59e0b");
            entity.Property(e => e.LetterheadTemplate).HasColumnName("letterhead_template")
                  .HasDefaultValue("Default Template");
            entity.Property(e => e.InvoiceTemplate).HasColumnName("invoice_template")
                  .HasDefaultValue("Professional");
        });

        modelBuilder.Entity<NotificationSetting>(entity =>
        {
            entity.ToTable("notification_settings");

            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id)
                  .HasColumnName("id")
                  .ValueGeneratedNever();

            entity.Property(e => e.GSTReturnReminders).HasColumnName("gst_return_reminders").HasDefaultValue(true);
            entity.Property(e => e.TDSReturnReminders).HasColumnName("tds_return_reminders").HasDefaultValue(true);
            entity.Property(e => e.ITRFilingReminders).HasColumnName("itr_filing_reminders").HasDefaultValue(true);
            entity.Property(e => e.ReminderDaysDeadline).HasColumnName("reminder_days_deadline").IsRequired();
            entity.Property(e => e.ReminderTime).HasColumnName("reminder_time").IsRequired();
            entity.Property(e => e.EmailNotifications).HasColumnName("email_notifications").HasDefaultValue(true);
            entity.Property(e => e.SMSNotifications).HasColumnName("sms_notifications").HasDefaultValue(false);
            entity.Property(e => e.WhatsAppNotifications).HasColumnName("whatsapp_notifications").HasDefaultValue(false);
        });

        modelBuilder.Entity<Notification>(entity =>
        {
            entity.ToTable("notifications");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();
            entity.Property(e => e.Text).HasColumnName("text").IsRequired();
            entity.Property(e => e.CreatedAt).HasColumnName("created_at").HasDefaultValueSql("CURRENT_TIMESTAMP");
        });
        // Inside OnModelCreating – add this block
        modelBuilder.Entity<SecuritySetting>(entity =>
        {
            entity.ToTable("security_settings");

            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id)
                  .HasColumnName("id")
                  .ValueGeneratedNever(); // We manually set Id = 1

            entity.Property(e => e.TwoFactorAuthentication)
                  .HasColumnName("two_factor_authentication")
                  .HasDefaultValue(false);

            entity.Property(e => e.SessionTimeout)
                  .HasColumnName("session_timeout")
                  .IsRequired();

            entity.Property(e => e.LoginAttemptLimit)
                  .HasColumnName("login_attempt_limit")
                  .IsRequired();

            entity.Property(e => e.DataEncryption)
                  .HasColumnName("data_encryption")
                  .HasDefaultValue("Enabled");

            entity.Property(e => e.AuditLogging)
                  .HasColumnName("audit_logging")
                  .HasDefaultValue(true);

            entity.Property(e => e.DataBackup)
                  .HasColumnName("data_backup")
                  .HasDefaultValue("Active");
        });

        base.OnModelCreating(modelBuilder);
    }
}